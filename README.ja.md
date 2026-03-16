# node-mailchecker
English README is here: [README.md](README.md)

POP3でメールを取得しローカルに保存するNode.jsプログラムです。

## 機能

- POP3でメールを取得し、ローカルの`data/`フォルダに保存する
- 既に取得済みのメールはダウンロードしない
- Gmailの場合、`recent:`接頭辞を使うと最新のメールから取得できる

## 必要環境

- Node.js

## 使い方

1. パッケージをインストール
```bash
npm i
```
2. 設定ファイルのコピー
```bash
cp pop3config_template.json pop3config.json
```
3. `pop3config.json`を編集
```json
{
  "user": "recent:___@gmail.com",
  "password": "__app_password_(not_your_google_password)__",
  "host": "pop.gmail.com",
  "tls": true
}
```
Gmailの場合、[アプリパスワード](https://support.google.com/accounts/answer/185833)を使用する

4. 実行
```bash
NODE_TLS_REJECT_UNAUTHORIZED=0 node mailchecker.mjs
```
`NODE_TLS_REJECT_UNAUTHORIZED=0`を設定しないと、自己署名証明書エラーが発生する可能性がある

- [node-sendmail-es](https://github.com/code4fukui/node-sendmail-es)

## ライセンス
このプロジェクトは [MIT License](LICENSE) のもとで公開されています。
