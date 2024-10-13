const _timeUtil = require("./_test/_timeUtil.js");
const _customTest = require("./_test/_customTest.js");

const args = process.argv.slice(2);
console.log(args);
args.forEach(async (item) => {
  switch (item) {
    case "custom":
      const customTest = new _customTest();
      await customTest.runTest();
      break;
    case "api":
      const timeUtil = new _timeUtil();
      await timeUtil.runTest();
      break;
    default:
      console.log("Testing all classes");
      break;
  }
});
