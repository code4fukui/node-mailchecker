# node-mailchecker

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

A simple Node.js script to fetch emails via POP3 and save them locally.

## Features

-   Fetches emails using the POP3 protocol.
-   Saves each email as a raw `.txt` file in a local `data/` directory.
-   Prevents re-downloading of messages by checking the POP3 UIDL.
-   Configurable for any POP3 server, with specific guidance for Gmail.
-   Supports TLS connections.

## Requirements

-   Node.js v10.0.0 or later

## Usage

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Create your configuration file:**
    ```bash
    cp pop3config_template.json pop3config.json
    ```

3.  **Edit `pop3config.json`** with your POP3 server credentials.
    ```json
    {
      "user": "recent:___@gmail.com",
      "password": "__app_password_(not_your_google_password)__",
      "host": "pop.gmail.com",
      "tls": true
    }
    ```
    *Note: For Gmail, you must use an [App Password](https://support.google.com/accounts/answer/185833). See the configuration details below.*

4.  **Run the script:**
    ```bash
    NODE_TLS_REJECT_UNAUTHORIZED=0 node mailchecker.mjs
    ```
    The `NODE_TLS_REJECT_UNAUTHORIZED=0` flag may be required to prevent `Error: self signed certificate` with some mail servers.

Emails will be downloaded to the `data/` directory. Each file is named after the email's unique ID (UIDL) and will not be downloaded again on subsequent runs.

## Gmail Configuration

### App Password

To use this script with Gmail, you must generate and use an **[App Password](https://support.google.com/accounts/answer/185833)**. Do not use your regular Google account password in the configuration file.

### Normal Mode vs. Recent Mode

Gmail's POP3 server offers two modes, controlled by the `user` field in your configuration:

-   **Normal Mode** (`"user": "your_email@gmail.com"`): Downloads the oldest un-downloaded emails in small batches.
-   **Recent Mode** (`"user": "recent:your_email@gmail.com"`): Downloads the last 30 days of mail, regardless of whether they've been accessed by another client.

For more details, see [Google's official documentation](https://support.google.com/mail/answer/7104828?hl=ja#zippy=%2C%E3%83%A1%E3%83%BC%E3%83%AB%E3%81%8C%E6%AD%A3%E3%81%97%E3%81%8F%E3%83%80%E3%82%A6%E3%83%B3%E3%83%AD%E3%83%BC%E3%83%89%E3%81%95%E3%82%8C%E3%81%AA%E3%81%84%E5%A0%B4%E5%90%88).

## Related Project

-   [node-sendmail-es](https://github.com/code4fukui/node-sendmail-es) - A tool for sending email.

## Core Dependency

This project is powered by the [node-pop3](https://github.com/node-pop3/node-pop3) library.

## License

ISC