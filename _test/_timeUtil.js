const TimeUtil = require("../scripts/timeUtil.js");
const TestUtil = require("./testUtil.js");

class _timeUtil {
  #timeUtil;
  #testUtil;
  constructor() {
    this.#timeUtil = new TimeUtil();
    this.#testUtil = new TestUtil();
  }

  async runTest() {
    this.#testUtil.titleTest("TimeUtil");
    await this.#test_1(this.#timeUtil.milisecondsToFullTime);
  }
  async #test_1(func) {
    await this.#testUtil.assert("1", async () => {
      return await this.#testUtil.isEqual(func, 6000, "1 min");
    });
  }
}

module.exports = _timeUtil;
