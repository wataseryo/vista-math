/* Shared selection rules. Counts describe challenges, not practice exercises. */
const VistaCatalog = (() => {
    const units = grade => grade === 5 ? EXAM_UNITS_G5 : EXAM_UNITS_G6;
    const chapters = grade => grade === 5 ? STANDARD_CHAPTERS_G5 : STANDARD_CHAPTERS_G6;
    function practice(grade, course, categoryId) {
        return PRACTICE_PROBLEMS.filter(p => p.grade === grade && p.course === course &&
            (!categoryId || (course === 'std' ? p.chapterId === categoryId : p.catId === categoryId)));
    }
    function challenges(grade, unitId) {
        const unit = units(grade).find(u => u.id === unitId);
        if (!unit) return [];
        return CHALLENGES.filter(p => p.grade === grade && (unit.categories || []).includes(p.categoryLabel));
    }
    function unitCount(grade, unitId) { return challenges(grade, unitId).length; }
    function standardTopic(grade, chapterId) {
        const chapter = chapters(grade).find(c => c.id === chapterId);
        return chapter && chapter.available ? chapter.topicScreen || null : null;
    }
    function problemTopic(problem, grade) {
        if (!problem || problem.grade !== grade) return null;
        if (problem.course === 'std') return standardTopic(grade, problem.chapterId);
        const explicit = units(grade).find(u => u.id === problem.topicUnitId && u.available);
        if (explicit) return explicit.topicScreen || null;
        const category = PRACTICE_CATS.find(c => c.id === problem.catId);
        const unit = category && units(grade).find(u => u.id === (grade === 5 ? category.unitId5 : category.unitId6));
        return unit && unit.available ? unit.topicScreen || null : null;
    }
    return { units, chapters, practice, challenges, unitCount, standardTopic, problemTopic };
})();
