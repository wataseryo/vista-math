const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
function validate(root = path.resolve(__dirname, '..')) {
  const errors = [], warnings = [];
  const fail = (file, id, reason) => errors.push(`${file}${id ? ` [${id}]` : ''}: ${reason}`);
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  const scripts = [...html.matchAll(/<script\b[^>]*src=["']([^"']+)["']/g)].map(m => m[1]);
  const files = fs.readdirSync(path.join(root, 'data/problems')).filter(f => f.endsWith('.js')).map(f => `data/problems/${f}`);
  const context = vm.createContext({});
  const sources = new Map();
  const aggregator = fs.readFileSync(path.join(root, 'data/problems.js'), 'utf8');
  const appIndex = scripts.indexOf('js/app.js');
  for (const file of scripts.filter(f => f.startsWith('data/'))) {
    if (appIndex >= 0 && scripts.indexOf(file) > appIndex) fail(file, '', 'data script must precede app.js');
  }
  for (const file of files) {
    const source = fs.readFileSync(path.join(root, file), 'utf8');
    const declaration = source.match(/const\s+(\w+)\s*=\s*\[/);
    if (!scripts.includes(file)) fail(file, '', 'index.html script loading is missing');
    if (!declaration || !new RegExp(`\\.\\.\\.${declaration[1]}\\b`).test(aggregator)) fail(file, '', 'aggregation is missing');
    if (declaration) sources.set(declaration[1], file);
  }
  for (const file of scripts.filter(f => f.startsWith('data/'))) {
    if (scripts.filter(f => f === file).length !== 1) fail(file, '', 'duplicate script');
    try { vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context, {filename: file, timeout: 1000}); }
    catch (e) { fail(file, '', e.message); }
  }
  let data;
  try { data = vm.runInContext('({PRACTICE_PROBLEMS,CHALLENGES,CATEGORIES,PRACTICE_CATS,EXAM_UNITS_G5,EXAM_UNITS_G6,STANDARD_CHAPTERS_G5,STANDARD_CHAPTERS_G6})', context); }
  catch (e) { fail('data/problems.js', '', e.message); return {errors, warnings, count: 0}; }
  const screens = new Set([...html.matchAll(/id=["']([^"']+)-screen["']/g)].map(m => m[1]));
  for (const [name, list] of Object.entries(data).filter(([name]) => !['PRACTICE_PROBLEMS','CHALLENGES'].includes(name))) {
    const ids = new Set();
    for (const item of list) {
      if (typeof item.id !== 'string' || !item.id || ids.has(item.id)) fail('data/categories.js',item.id,`missing or duplicate ID in ${name}`);
      ids.add(item.id);
    }
  }
  const cats = new Set(data.CATEGORIES.map(x => x.id));
  const pcats = new Set(data.PRACTICE_CATS.map(x => x.id));
  const seen = new Set();
  const origin = p => { for (const [name, file] of sources) { if (vm.runInContext(`${name}.some(p=>p.id===${JSON.stringify(p.id)})`, context)) return file; } return 'data/problems.js'; };
  for (const [kind, list] of [['practice',data.PRACTICE_PROBLEMS], ['challenge',data.CHALLENGES]]) {
    for (const p of list) {
      const file = origin(p), check = (ok, reason) => { if (!ok) fail(file,p.id,reason); };
      check(typeof p.id === 'string' && p.id.length > 0, 'missing ID');
      check(!seen.has(p.id), 'duplicate ID'); seen.add(p.id);
      for (const field of ['title','text','hint']) check(typeof p[field] === 'string' && p[field].trim().length > 0, `missing ${field}`);
      check([5,6].includes(p.grade), 'invalid grade');
      check(Number.isInteger(p.difficulty) && p.difficulty >= 1 && p.difficulty <= 5, 'invalid difficulty');
      check(typeof p.answer === 'number' && Number.isFinite(p.answer), 'answer must be a finite number');
      check(typeof p.answerUnit === 'string', 'missing answerUnit');
      check(cats.has(p.mainCategory), 'unknown mainCategory');
      const units = p.grade === 5 ? data.EXAM_UNITS_G5 : data.EXAM_UNITS_G6;
      if (p.topicUnitId) check(units.some(u => u.id === p.topicUnitId), 'unknown topicUnitId or wrong grade');
      if (kind === 'practice') {
        check(['std','exam'].includes(p.course), 'invalid course');
        check(p.answerType === 'number', 'unsupported answerType');
        if (p.course === 'exam') check(pcats.has(p.catId), 'unknown catId');
        if (p.course === 'std') check((p.grade === 5 ? data.STANDARD_CHAPTERS_G5 : data.STANDARD_CHAPTERS_G6).some(c=>c.id===p.chapterId), 'unknown chapterId');
        check(typeof p.solution === 'string' && p.solution.trim().length > 0, 'missing solution');
        if (typeof p.solution === 'string' && (!/【確認】/.test(p.solution) || !/答え[：:]/.test(p.solution))) warnings.push(`${file} [${p.id}]: legacy solution format; review when editing`);
      } else {
        check(p.course === undefined || p.course === 'exam', 'invalid challenge course');
        check(typeof p.categoryLabel === 'string' && p.categoryLabel.length > 0, 'missing categoryLabel');
        check(Array.isArray(p.explanation) && p.explanation.length > 0 && p.explanation.every(s=>typeof s.title==='string' && typeof s.text==='string' && s.text.trim()), 'invalid explanation');
      }
    }
  }
  for (const grade of [5,6]) {
    const units = grade===5 ? data.EXAM_UNITS_G5 : data.EXAM_UNITS_G6;
    const chapters = grade===5 ? data.STANDARD_CHAPTERS_G5 : data.STANDARD_CHAPTERS_G6;
    for (const unit of [...units,...chapters]) {
      if (unit.topicScreen && !screens.has(unit.topicScreen)) fail('data/categories.js',unit.id,'unknown topicScreen');
      if (unit.parentUnit && !units.some(u=>u.id===unit.parentUnit)) fail('data/categories.js',unit.id,'unknown parentUnit');
      if (chapters.includes(unit) && unit.available && !unit.topicScreen) fail('data/categories.js',unit.id,'available standard chapter needs topicScreen');
    }
    for (const c of data.PRACTICE_CATS) if (!units.some(u=>u.id===c[`unitId${grade}`])) fail('data/categories.js',c.id,`unknown unitId${grade}`);
  }
  return {errors,warnings,count:data.PRACTICE_PROBLEMS.length+data.CHALLENGES.length};
}
if (require.main===module) {
  const result=validate(process.argv[2]);
  for (const error of result.errors) console.error(error);
  console.log(`${result.count} problems; ${result.errors.length} errors; ${result.warnings.length} legacy-format warnings`);
  if (result.errors.length) process.exitCode=1;
}
module.exports={validate};
