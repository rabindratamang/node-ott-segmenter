const m3u8Parser = require("m3u8-parser");

const getParsedManifest = (manifest) => {
  let parser = new m3u8Parser.Parser();
  parser.push(manifest);
  parser.end();
  return parser.manifest;
};

const getSubEvents = (parsedManifest, maximumSubEventDuration) => {
  const segments = parsedManifest.segments;
  let totalDuration = 0;
  let hasDiscontinuity = false;
  let isStarted = false;

  segments.forEach((segment) => {
    if (
      segment.hasOwnProperty("discontinuity") &&
      segment.discontinuity &&
      !isStarted
    ) {
      isStarted = true;
      hasDiscontinuity = true;
      console.log(`START ${segment.uri}`);
    }

    if (isStarted) {
      totalDuration += segment.duration;
    }

    if (totalDuration >= maximumSubEventDuration) {
      console.log(`END ${segment.uri} ${totalDuration}`);
      isStarted = true;
      totalDuration = 0;
    }
  });

  //   segments.map((segment) => {
  //     getEvent(segments, maximumSubEventDuration);
  //   });
};

const getEvent = (segment, maximumSubEventDuration) => {
  return segment;
};

module.exports = {
  getParsedManifest,
  getSubEvents,
};