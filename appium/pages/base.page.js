// RN testID -> iOS accessibility id; Android resource-id (RN >= 0.64, raw value, no package prefix)
module.exports = class BasePage {
  el(testId) {
    return driver.isAndroid
      ? $(`android=new UiSelector().resourceId("${testId}")`)
      : $(`~${testId}`);
  }
};
