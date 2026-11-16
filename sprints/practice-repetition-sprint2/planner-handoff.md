# Planner 引き渡し: 類題(反復練習) Sprint 2

- 作成日: 2026-11-16
- 正本: `specs/2026-11-16-practice-repetition-sprint2.md`（ユーザー確定済み。再生成・改変しない）
- 単一Sprint。Generator実装後、別担当Evaluatorが検証する。コミット・pushは行わない。

## 実装範囲

1. `data/problems/practice-g6-plane.js`末尾へ仕様5章の4問をそのまま追記する。数学的内容・solution・tags・expandVisualData・expandAdviceを含む既定フィールドは改変せず、diagramのみ新規設計する。
2. SVGは14px/cmを基準に底辺・高さから頂点、引き出し線、viewBoxを再計算する。三角形は青、平行四辺形は緑。面積と底辺は表示し、高さは「高さ ？」とし、数値解答を図に含めない。v02は三角形の底辺が上・頂点が下、平行四辺形は左右反転した傾き。role/aria-labelを付け、375px幅でも確認する。
3. `data/practice-variant-groups.js`へ仕様3章の2グループをそのまま追記する。P-07、基本→v01→v02の順序を維持する。
4. `tests/catalog.test.cjs`の226→230件更新、新規2グループの未知ID・グループ横断重複等の異常系を追加する。
5. `tests/practice-repetition.spec.cjs`の26→30件更新と仕様6章12シナリオを実装する。既存Sprint1の3シナリオは件数以外無変更とする。

## 保護対象

- 既存26問の全フィールド、Sprint1グループの内容・順序を維持する。
- `js/navigation.js`は変更禁止。
- `js/app.js`、`css/style.css`、`scripts/validate-content.cjs`、`index.html`、`data/problems.js`、`data/categories.js`は変更しない。前提が崩れたら編集せず自己評価に理由を記録し報告する。
- 新規習得判定・保存キー・UIは追加しない。
- 外部PMファイルは今回のCodex範囲外かつ書込許可外のため変更しない。TODOは独立レビュー待ちであることを踏まえ、完了扱いを先走らない。

## 検証と引き渡し

- 追加前の新規ID確認: `rg -c "id: 'g6_plane_004_v0|id: 'g6_plane_005_v0" data/problems/practice-g6-plane.js` は出力なし・終了コード1（0件）。
- 完了条件1〜7: 既存26問・既存グループの非変更、4問・2グループの追加、仕様フィールド完全一致、SVG数値・向き・未知高さ、グループ横断非重複、禁止ファイルの空diffを確認する。
- 完了条件8〜12: 新規両セットの正誤両方の次問案内、末尾のボタンなし終了案内、問27〜30、非所属問題で案内非表示を確認する。
- 完了条件13〜16（重点）: Sprint1セットの遷移・終了・番号不変、新規セット案内の分離、3セット連続操作時のanswered・履歴・記録の分離、全グループ非重複を確認する。
- 完了条件17〜20: 新規両セットの戻る/進む/再読込復元、類題遷移時のhistory +1、新規4問の二重記録ガード・戻る後の記録不増、新判定・保存キー不在を確認する。
- 完了条件21〜24: `node scripts/validate-content.cjs`（230問・0エラー）、`node --test tests/catalog.test.cjs`、`npm test`、`npx playwright test`（desktop/mobile既存＋新規全件）を実行し実出力と件数を記録する。ブラウザ検証が環境上実施不能なら未達として正直に記載する。
- 完了条件25: Claudeによる仕様5章の逆検算済み記載を確認する（7×12÷2=42、16×9÷2=72、15×6=90、8×12=96）。Codexによる数学内容の再設計はしない。
- 自己評価: `sprints/practice-repetition-sprint2/sprint-1-self-eval.md` に25項目を個別に列挙し、達否・証拠、変更一覧、禁止ファイル空diff、テスト実出力・件数、実ブラウザ状況、未解決点を記録する。
- Evaluatorは `sprint-1-eval.md` へ独立評価を保存する。不合格時は最大3回の修正サイクルを記録する。
- 最後にgit statusで変更一覧を確認し、コミットしない。Claude独立レビューへ引き渡す。
