# お問い合わせフォーム バックエンド (Google Apps Script)

このディレクトリの `Code.gs` を Google Apps Script に貼り付けて Web App として
デプロイすると、お問い合わせフォームのバックエンドになります。
（このフォルダはソース管理用の控えです。実行されるのは GAS 側にコピーしたコードです）

## 1. スプレッドシートを用意

1. Google ドライブで新規スプレッドシートを作成（例: 「大福工務店 お問い合わせ」）
2. シート名を `お問い合わせ` に変更（変えない場合は `Code.gs` の `SHEET_NAME` を合わせる）
3. 1 行目に見出しを入力:

   | A | B | C | D | E | F | G |
   |---|---|---|---|---|---|---|
   | 受信日時 | お名前 | ふりがな | メール | 電話 | 種別 | 内容 |

## 2. Apps Script にコードを貼る

1. スプレッドシート上部メニュー →「拡張機能」→「Apps Script」
2. 既存の `Code.gs` の中身を全削除し、このフォルダの `Code.gs` を丸ごと貼り付け
3. 保存（フロッピーアイコン or Ctrl/Cmd+S）

`NOTIFY_TO` は `makiporigon@gmail.com` に設定済みです。変更する場合はここを編集。

## 3. Web App としてデプロイ

1. 右上「デプロイ」→「新しいデプロイ」
2. 歯車（種類の選択）→「ウェブアプリ」
3. 設定:
   - 説明: 任意（例: contact-v1）
   - 次のユーザーとして実行: **自分**
   - アクセスできるユーザー: **全員**
4. 「デプロイ」をクリック
5. 初回は権限承認ダイアログ → 自分の Google アカウントで承認
   （「このアプリは確認されていません」が出たら「詳細」→「（安全でないページ）に移動」で承認）
6. 表示される **ウェブアプリ URL**（`https://script.google.com/macros/s/●●●/exec`）をコピー

## 4. 疎通確認

ブラウザでその URL を開き、`{"result":"ok","message":"Contact endpoint is running."}`
が表示されれば doGet 動作 OK。

## 5. フロントに URL を設定

- ローカル: `app/frontend/.env` を作成し
  `VITE_CONTACT_ENDPOINT=（コピーした URL）` を記入
- 本番: Cloudflare Pages のプロジェクト設定 → 環境変数に
  `VITE_CONTACT_ENDPOINT` = 同じ URL を追加

## 6. スパム対策 Cloudflare Turnstile（任意・推奨）

公開後のスパム対策。設定しなくてもフォームは動くが、公開前に推奨。

1. Cloudflare ダッシュボード → **Turnstile** → ウィジェットを追加
   - ウィジェット名: 任意（例: daifuku-koumuten）
   - ドメイン: `daifuku-koumuten-site.pages.dev`（独自ドメインがあれば併記）
   - モード: Managed（推奨）
2. 発行される **Site Key**（公開鍵）と **Secret Key**（秘密鍵）を控える
3. **Site Key** を Cloudflare Pages の環境変数に追加:
   - `VITE_TURNSTILE_SITE_KEY` = Site Key
   - 追加後に Pages を **再デプロイ**（ビルド時に埋め込まれるため）
4. **Secret Key** を GAS のスクリプトプロパティに設定:
   - Apps Script エディタ → 左の歯車「プロジェクトの設定」
   - 「スクリプト プロパティ」→ プロパティを追加
   - プロパティ名: `TURNSTILE_SECRET` / 値: Secret Key → 保存
   - その後 GAS を**再デプロイ**（下記「コードを更新したとき」と同じ手順）
5. 確認: フォームに Turnstile のチェックが表示され、通過しないと送信できなければ OK

> Secret Key はリポジトリに置かない（スクリプトプロパティで管理）。
> Site Key は公開鍵なのでクライアントJSに埋め込まれて問題なし。

## コードを更新したとき

GAS 側でコードを編集したら、必ず「デプロイ」→「デプロイを管理」→ 既存デプロイの
鉛筆アイコン →「バージョン」を「新バージョン」にして再デプロイしてください。
（URL は変わりません。再デプロイしないと変更が反映されません）

## トラブルシュート

- **フォーム送信で失敗する**: ブラウザの開発者ツール → Network で当該リクエストを確認。
  CORS エラーが出る場合、フロントが `Content-Type: text/plain` で送っているか確認
  （`application/json` だとプリフライトで失敗します）。
- **メールが届かない**: GAS の実行ログ（Apps Script の「実行数」）でエラーを確認。
  MailApp は 1 日あたりの送信上限（無料アカウントで 100 通程度）あり。
- **スプレッドシートに入らない**: `SHEET_NAME` とシート名の一致を確認。
