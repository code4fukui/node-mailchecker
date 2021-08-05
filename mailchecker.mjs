// Error: self signed certificate
// export NODE_TLS_REJECT_UNAUTHORIZED=0
// NODE_TLS_REJECT_UNAUTHORIZED=0 node t.mjs
// export NODE_TLS_REJECT_UNAUTHORIZED=1

import Pop3Command from "node-pop3";
import fs from "fs";

//import { Iconv } from "iconv";

//const jisdecoder = new Iconv("ISO-2022-JP", "UTF-8");

const downloadMailAll = async (pop3) => {
  fs.mkdirSync("data", { recursive: true });
  const uidl = await pop3.UIDL();
  for (const msg of uidl) {
    const nmsg = msg[0];
    const msgid = msg[1];
    const fn = "data/" + msgid + ".txt";
    if (fs.existsSync(fn)) {
      console.log("skip", msg)
      continue;
    }
    const s = await pop3.RETR(nmsg);
    fs.writeFileSync(fn, s);

    /*
    const fn2 = "data/" + msgid + "-jis_decoded.txt";
    try {
      const s2 = jisdecoder.convert(s).toString();
      fs.writeFileSync(fn2, s2);
      console.log(s2, msg);
    } catch (e) {
      console.log(e, msg);
    }
    */
  }
};

const pop3config = JSON.parse(fs.readFileSync("pop3config.json", "utf-8"));
const pop3 = new Pop3Command(pop3config);

const stat = await pop3.STAT();
console.log(stat); // 761 11239940

// UIDL(msgNumber = ''), NOOP, LIST(msgNumber = ''), RSET, RETR(msgNumber), DELE(msgNumber), STAT, TOP(msgNumber, n = 0), QUIT
//const uidl = await pop3.UIDL();
//console.log(uidl.map(a => a[0]).join(","));

//const list = await pop3.LIST();
//console.log(list); // msgNuber, size

/*
const nmsg = uidl[uidl.length - 1][0]; // latest
const top = await pop3.TOP(nmsg);
console.log(top);
*/
await downloadMailAll(pop3);

await pop3.QUIT();
