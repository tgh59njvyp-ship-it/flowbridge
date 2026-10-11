# FLOWBRIDGE 実装計画

## 方針
ローカル完結・静的ホスティング可能な React + TypeScript + Vite アプリとして実装する。React Flow はキャンバス、IndexedDB は保存、Web Worker は個別処理の拡張ポイントとして分離する。

## 構成
- `src/App.tsx`: UI、編集操作、テーマ、インポート/エクスポート
- `src/types`: ワークフロー定義とデータ型
- `src/blocks`: ブロック仕様と独立処理関数
- `src/engine`: トポロジー実行、キャンセル、循環/過剰処理ガード、Worker
- `src/storage`: IndexedDB永続化
- `public/manus-routes.json`: 静的ルート定義

## デザイン
ホワイト基調の静かなプロダクトUI。Manrope + DM Mono、角丸カード、ミント/インディゴ/オレンジのカテゴリカラー。キャンバスを主役にし、左のブロックライブラリと右のインスペクターで操作を短く保つ。モバイルではライブラリをドロワー化し、OSのreduce-motionを尊重する。

## MVP受け入れ条件
- テキスト入力→整形→ダウンロードの実行経路
- JSON検証/整形、CSV→JSON、画像リサイズ、ファイル名変更
- 型不一致接続のエラー表示、実行状態、キャンセル、循環ガード
- IndexedDB保存、JSON入出力、2MB検証
- レスポンシブ編集UI、ライト/ダーク、JP/EN切替ボタン
- README、CONTRIBUTING、LICENSE、SECURITY、CI、テスト、ビルド
