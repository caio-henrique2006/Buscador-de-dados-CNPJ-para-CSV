class TestUtil {
  async titleTest(text) {
    console.debug("\x1b[44m Test:", text, "\x1b[0m");
  }
  async assert(id, func) {
    try {
      if (await func()) {
        console.debug("\x1b[32m", "Test", id, "Passed", "\x1b[0m");
      } else {
        console.debug("\x1b[31m", "Test", id, "Exception", "\x1b[0m");
      }
    } catch (e) {
      console.debug("\x1b[31m", "Test", id, "Exception", "\x1b[0m");
    }
  }
  async isEqual(func, input, output) {
    return (await func(input)) == output;
  }
  async isDiff(func, input, output) {
    return (await func(input)) != output;
  }
  async isArray(func, input) {
    return Array.isArray(await func(input));
  }
  async isEmptyArray(func, input) {
    const response = await func(input);
    if (Array.isArray(response)) {
      return response.length == 0;
    }
  }
  async isJson(func, input) {}
  async isEmptyJson(func, input) {}
}

module.exports = TestUtil;
