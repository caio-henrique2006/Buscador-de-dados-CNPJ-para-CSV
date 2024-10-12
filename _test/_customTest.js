const timeUtil = require("../scripts/timeUtil.js");

class CustomTest {
  async runTest() {
    const obj = new timeUtil();
    console.log(obj.milisecondsToFullTime(10000));
  }
}

module.exports = CustomTest;
