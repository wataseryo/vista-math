# Sprint 1 自己評価

## 完了条件チェック

| 完了条件 | 状態 | 備考 |
|----------|------|------|
| 7セクションの新規画面 | ✅ | index.htmlのu6-calc-screen。基本例題と演習の間にtrial-u6-calc |
| showScreenで体験問題初期化 | ✅ | initTopicTrial('u6-calc')を追加 |
| カテゴリ公開 | ✅ | u6-calc行のavailableとtopicScreenのみ変更 |
| 予測→確認 | ✅ | 3択を選択後に確認。数式の25と4を強調 |
| ルール2〜4の検討記録 | ✅ | 仕様書末尾。ルール3は3段階のユーザー操作表示 |
| 受験コースカードから開く | 実装済・実ブラウザ未確認 | 既存topicScreen経路を再利用 |
| 全9問のトピック導線 | 実装済・実ブラウザ未確認 | 既存topicUnitIdと公開topicScreenにより汎用経路が成立 |
| validate-content.cjs | ✅ | 親検証担当実行: 219問、0エラー、既存警告75件 |
| npm test | ✅ | 親検証担当実行: 37件pass |
| 実ブラウザ操作確認 | 未完了 | サーバーlisten EPERM、Chrome SIGABRT、CUA file URLポリシー拒否の報告あり |
| 平面図形変更なし | ✅ | 平面図形のHTML・JS・CSS・問題ファイルに手を加えていない |

## 実装メモ

- 変更: index.html、js/app.js、data/categories.js、css/calc-topic.css、仕様書末尾、本自己評価。
- 予測選択はaria-pressed、段階説明はaria-live、操作は標準button。答え未公開の段階はhiddenで非表示。スタイルはu6-calc-screen内に限定。
- 体験問題は既存の最大3問・採点・スキップ・演習への導線を利用。体験中の末尾nav非表示も既存動作に合わせた。
- 仕様から逸脱した点: なし。四捨五入の桁を明示して数学的曖昧さを除いた。
- 既存演習9問は無変更。categories.jsはu6-calcの2フィールドのみ変更。既存dirtyファイルは保持。
- 申し送り: 実ブラウザ確認が通るまでスプリント合格としない。コミット・pushは親指示により行っていない。

## 対象ファイルSHA-256

```text
bde722ac0321e17fee7dd4c9cb4a7a9b7eeeddec0323471cde2ace946bb4d56d  index.html
3d4414655d230f25c5e2c247ac3aba35326c5b74ff435e29b81577f537096a64  js/app.js
2b81d46fa4ba7734f1671f224be3d58f74e55c485f18c30f63f3ce748994508a  data/categories.js
5fa7ef4567ec8459d5f43f09ba110699df991a296896912c1fae12aab0230c5f  css/calc-topic.css
```

## 自己評価スコア

- 実装・Node検証完了。node --check js/app.jsとgit diff --checkも成功。実ブラウザ必須条件はEvaluatorの検証待ち。
- 懸念点: 実ブラウザの操作・モバイル表示は環境制約により未確認。
