const _timeUtil = require("./_test/_timeUtil.js");

const args = process.argv.slice(2);
args.forEach(async (item) => {
  switch (item) {
    case "api":
      const timeUtil = new _timeUtil();
      await timeUtil.runTest();
      break;
    default:
      console.log("Testing all classes");
      break;
  }
});
