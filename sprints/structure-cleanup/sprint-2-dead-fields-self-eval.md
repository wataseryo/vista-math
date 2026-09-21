---
created: "2026-09-21"
project: "structure-cleanup"
sprint: 2
author: "Claude"
status: "done"
---

# Sprint 2 自己評価: 死んだフィールド削除 + categories.js整理

Sprint 1（物理分割）に続く作業。Codex構造整理計画のP1ステップ5・P2ステップ8を実施。

## 実施内容

### 1. `visualTypes` / `isRandomGenerated` を全202問から削除

事前確認: `js/app.js`, `index.html`, `landing.html` のいずれからも参照されていないことを再確認（0件）。

正規表現による機械的削除を実施（Node script、`data/problems/*.js` 全10ファイル対象）:
- 同一行に両方書かれているケース（practice系、115件）
- 別行に分かれているケース（拡張challenge系、59件）
の両方を1つの正規表現で処理（`\s*` が改行もまたぐため）。

削除件数: 174件（visualTypes/isRandomGeneratedのペア）。

### 2. `data/categories.js` の未参照`figures`エントリを削除

`STANDARD_CHAPTERS`配列内の`{ id: 'figures', ... }`のみを削除。
`STANDARD_CHAPTERS_G5`の`figures-g5`、`STANDARD_CHAPTERS_G6`の`figures-g6`は維持（Codex調査で「標準コース画面の準備中カードとして実際に描画されている」ため削除禁止と判定済み）。

**補足**: `STANDARD_CHAPTERS`配列自体もどこからも参照されていないことを確認したが（`grep`で確認）、これは今回承認されたスコープ（`figures`エントリのみ削除）を超えるため配列自体の削除は見送った。将来の判断材料として記録のみ残す。

## 検証内容(実施済み)

1. 全10分割ファイル + categories.js で `node --check` 構文エラーなし
2. `grep`で`visualTypes`/`isRandomGenerated`の残存が完全にゼロであることを確認
3. **深い内容比較**: Sprint 1コミット時点（HEAD）と現在を比較し、削除した2フィールド以外の全フィールド・ID・順序が完全一致することをNode vmで検証（202問中ミスマッチ0件）
4. ブラウザ実機確認（Playwright）:
   - `g6_plane_015`の図表示・採点（50→正解）が正常動作
   - `STANDARD_CHAPTERS`から`figures`が消え、`STANDARD_CHAPTERS_G5/G6`の`figures-g5/g6`は残っていることをJS評価で確認
   - 標準コース→6年生→トピック学習画面をUIクリックで開き、「第5章 図形・空間図形」カードが「準備中」表示のまま正常に表示されることをスクリーンショットで確認

## 未実施・既知の制約

- フィールド名統一（`unit→answerUnit`, `question→text`, `category→categoryLabel`）は未実施（次スプリント。localStorage保存キーに影響するため慎重に進める）
- `STANDARD_CHAPTERS`配列自体の削除は見送り（未承認スコープ）
- 保護者レポート・弱点復習など問題データを横断参照する画面の個別クリック確認はしていない（データが完全一致のため理論上影響なしと判断）

## Codexレビュー結果(2026-09-21)

読み取り専用の独立レビューを実施。**指摘ゼロ。**

- 全10ファイルをHEADと比較し、削除した2フィールド以外はバイト単位で一致することを確認
- 残存・類似名（`visual`を含む他の識別子等）の誤削除もゼロ
- categories.jsの差分は`figures`1行のみ、構文・隣接要素とも無傷
- コメント・tags配列・問題文内に偶然同名文字列が含まれて誤爆したケースもなし

## 変更ファイル

- `data/problems/*.js`（10ファイル、visualTypes/isRandomGeneratedを削除）
- `data/categories.js`（`figures`エントリを削除）

未コミット。
