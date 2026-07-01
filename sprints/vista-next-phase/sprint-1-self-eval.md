# Sprint 1 自己評価

## 完了条件チェック
| 完了条件 | 状態 | 備考 |
|----------|------|------|
| `PRACTICE_CATS` の `pc-ratio` の `sub` に「食塩水」が明記される | ✅ | `sub` を「食塩水・濃度・売買・比の利用」に変更 |
| `EXAM_UNITS_G6` の `u6-salt` が `u6-ratio` の派生であることがコメントで明記され、UIで「割合・比」グループの一部として扱われる | ✅ | `parentUnit: 'u6-ratio'` フィールド追加 + 3行のコメントを明記 |
| `data/problems.js` 内で `mainCategory` の値が4つのみになる（確認のみ、修正があれば実施） | ✅ | 調査の結果すべて正しい4値（ratio/speed/word_problems/solid_geometry）のみ。修正不要 |
| `CATEGORIES` 配列と実際の `mainCategory` 値のマッピングが `categories.js` のコメントに整理される | ✅ | CATEGORIES MASTER ヘッダーコメントに4値の対応表を追記。各 id にも inline コメントを追加 |
| 既存の localStorage (`vista_stats`, `vista_history`) のキー構造が変わらない | ✅ | データ定義のコメント・フィールド追加のみ。localStorage 操作コードは無変更 |
| 既存UIの表示・動作が壊れない | ✅ | app.js は `parentUnit` を参照しておらず、追加フィールドは無害。topicScreen: 'salt' も維持 |

## 実装メモ
- 仕様から逸脱した点: なし
- problems.js の mainCategory は調査の結果すでに正規4値のみであったため、修正作業は不要だった
- `parentUnit: 'u6-ratio'` フィールドは現時点で app.js から参照されていないが、Sprint 3・4 の弱点分析ロジックで u6-salt を u6-ratio グループとして集計する際に活用できる
- 次スプリントへの申し送り:
  - Sprint 2（導入コンテンツ）では `u6-ratio`, `u6-speed`, `u6-special` のトピック画面冒頭に追加する。`topicScreen` フィールドが 'salt' の場合は food screen であることを確認してから実装すること
  - 食塩水トピック画面（`salt` screen）には Sprint 2 の導入コンテンツを追加しない（6年生・3カテゴリのみが対象）

## 自己評価スコア
- 完了条件達成率: 6/6
- 懸念点: なし
