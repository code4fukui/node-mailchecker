# node-mailchecker

POP3経由でメールを取得し、ローカルに保存するシンプルなNode.jsスクリプトです。

## 機能

-   POP3プロトコルを使用してメールを取得します。
-   各メールをローカルの `data/` ディレクトリに生の `.txt` ファイルとして保存します。
-   POP3のUIDLをチェックし、メッセージの再ダウンロードを防ぎます。
-   任意のPOP3サーバー用に設定可能で、Gmail向けの具体的な設定方法も記載しています。
-   TLS接続をサポートしています。

## 要件

-   Node.js v10.0.0 以降

## 使い方

1.  **依存関係のインストール:**
    ```bash
    npm install
    ```

2.  **設定ファイルの作成:**
    ```bash
    cp pop3config_template.json pop3config.json
    ```

3.  **`pop3config.json` を編集**し、POP3サーバーの認証情報を入力します。
    ```json
    {
      "user": "recent:___@gmail.com",
      "password": "__app_password_(not_your_google_password)__",
      "host": "pop.gmail.com",
      "tls": true
    }
    ```
    *注: Gmailの場合、[アプリ パスワード](https://support.google.com/accounts/answer/185833)を使用する必要があります。詳細は以下の設定項目を参照してください。*

4.  **スクリプトの実行:**
    ```bash
    NODE_TLS_REJECT_UNAUTHORIZED=0 node mailchecker.mjs
    ```
    一部のメールサーバーで `Error: self signed certificate` が発生するのを防ぐため、`NODE_TLS_REJECT_UNAUTHORIZED=0` フラグが必要になる場合があります。

メールは `data/` ディレクトリにダウンロードされます。各ファイルはメールの一意のID（UIDL）に基づいて命名され、次回以降の実行時に再ダウンロードされることはありません。

## Gmailの設定

### アプリ パスワード

このスクリプトをGmailで使用するには、**[アプリ パスワード](https://support.google.com/accounts/answer/185833)** を生成して使用する必要があります。設定ファイルに通常のGoogleアカウントのパスワードを使用しないでください。

### 通常モードと最新モード

GmailのPOP3サーバーには2つのモードがあり、設定ファイルの `user` フィールドで制御します。

-   **通常モード** (`"user": "your_email@gmail.com"`): まだダウンロードされていない最も古いメールを小分けにしてダウンロードします。
-   **最新モード** (`"user": "recent:your_email@gmail.com"`): 他のクライアントでアクセスされたかどうかに関わらず、過去30日間のメールをダウンロードします。

詳細については、[Googleの公式ドキュメント](https://support.google.com/mail/answer/7104828?hl=ja#zippy=%2C%E3%83%A1%E3%83%BC%E3%83%AB%E3%81%8C%E6%AD%A3%E3%81%97%E3%81%8F%E3%83%80%E3%82%A6%E3%83%B3%E3%83%AD%E3%83%BC%E3%83%89%E3%81%95%E3%82%8C%E3%81%AA%E3%81%84%E5%A0%B4%E5%90%88)を参照してください。

## 関連プロジェクト

-   [node-sendmail-es](https://github.com/code4fukui/node-sendmail-es) - メール送信ツール。

## コア依存関係

このプロジェクトは [node-pop3](https://github.com/node-pop3/node-pop3) ライブラリを使用しています。

## ライセンス

ISC
