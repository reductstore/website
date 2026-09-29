// Social card: node render.js (needs puppeteer-core and a Chromium binary in CHROMIUM)
const puppeteer = require("puppeteer-core");
const fs = require("fs");
(async () => {
  const b = await puppeteer.launch({
    executablePath: process.env.CHROMIUM || "chromium",
    headless: true,
    args: ["--no-sandbox"],
  });
  const p = await b.newPage();
  await p.setViewport({ width: 1200, height: 630 });
  const svg = fs.readFileSync(
    __dirname + "/influxdb-reductstore-flow.svg",
    "utf8",
  );
  await p.setContent(`<!doctype html><meta charset="utf-8"><style>html,body{margin:0;background:#fff}
    body{width:1200px;height:630px;display:flex;align-items:center;justify-content:center}
    svg{display:block;height:570px;width:auto}</style>${svg}`);
  await p.emulateMediaFeatures([
    { name: "prefers-color-scheme", value: "light" },
  ]);
  await p.screenshot({
    path: __dirname + "/influxdb-reductstore-social.png",
    clip: { x: 0, y: 0, width: 1200, height: 630 },
  });
  await b.close();
})();
