const TimeUtil = require("../scripts/timeUtil.js");

export default class _timeUtil {
  #timeUtil;
  constructor() {
    this.#timeUtil = new TimeUtil();
  }

  runTest() {
    this.#test1();
  }
  #test1() {}
}
