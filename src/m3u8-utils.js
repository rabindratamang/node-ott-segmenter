const m3u8Parser = require("m3u8-parser");

const getParsedManifest = (manifest) => {
  let parser = new m3u8Parser.Parser();
  parser.push(manifest);
  parser.end();
  return parser.manifest;
};

const printSubEvents = (parsedManifest, maximumSubEventDuration) => {
  const segments = parsedManifest.segments;
  let totalDuration = 0;
  let hasDiscontinuity = false;
  let hasStarted = false;

  const evaluateSegment = (segment) => {
    //If end of discontinuity print end the event and reset all flags and skip current loop
    if (hasDiscontinuity && segment.hasOwnProperty("discontinuity")) {
      console.log(`END ${segment.uri} ${totalDuration}`);
      totalDuration = 0;
      hasStarted = false;
      hasDiscontinuity = false;
      return;
    }

    //If start of discontinuity print start the event and update flags
    if (
      segment.hasOwnProperty("discontinuity") &&
      segment.discontinuity &&
      !hasStarted &&
      !hasDiscontinuity
    ) {
      hasStarted = true;
      hasDiscontinuity = true;
      console.log(`START ${segment.uri}`);
    }

    if (hasStarted) {
      totalDuration += segment.duration;
      if (totalDuration >= maximumSubEventDuration) {
        console.log(`END ${segment.uri} ${totalDuration}`);
        totalDuration = 0;
        console.log(`START ${segment.uri}`);
      }
    }
  };

  segments.forEach((segment) => {
    evaluateSegment(segment);
  });
};

module.exports = {
  getParsedManifest,
  printSubEvents,
};
