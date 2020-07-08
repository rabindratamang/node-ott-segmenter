const fs = require("fs");
const { getParsedManifest, printSubEvents } = require("./src/m3u8-utils");

const manifest = fs.readFileSync("./example.m3u8", { encoding: "utf-8" });
let parsedManifest = getParsedManifest(manifest);
const maximumSubEventDuration = 30;
printSubEvents(parsedManifest, maximumSubEventDuration);
