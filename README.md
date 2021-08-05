# node-mailchecker
 
POP3でメールを取得しローカルに保存するNode.js用プログラム


## how to use

```bash
npm i
cp pop3config_template.json pop3config.json
```

edit pop3config.json
```
{
  "user": "recent:___@gmail.com",
  "password": "__app_password_(not_your_google_password)__",
  "host": "pop.gmail.com",
  "tls": true
}
```
Gmailの場合は、[アプリパスワード](https://support.google.com/accounts/answer/185833)を生成して使用する

```bash
NODE_TLS_REJECT_UNAUTHORIZED=0 node mailchecker.mjs
```
NODE_TLS_REJCT_UNAUTHORIZEDをセットしないと、Error: self signed certificate が出ます

data/ ファルダにメールが保存されます（IDで取得済みの場合ダウンロードしません）

Gmailの場合、メールアドレス前の recent: がついていると最新取得、ついていないと一番古いものから少しずつ取得（[POP を使用して他のメール クライアントで Gmail のメールを読む - Gmail ヘルプ](https://support.google.com/mail/answer/7104828?hl=ja#zippy=%2C%E3%83%A1%E3%83%BC%E3%83%AB%E3%81%8C%E6%AD%A3%E3%81%97%E3%81%8F%E3%83%80%E3%82%A6%E3%83%B3%E3%83%AD%E3%83%BC%E3%83%89%E3%81%95%E3%82%8C%E3%81%AA%E3%81%84%E5%A0%B4%E5%90%88)）

## lib

[node-pop3](https://github.com/node-pop3/node-pop3)

