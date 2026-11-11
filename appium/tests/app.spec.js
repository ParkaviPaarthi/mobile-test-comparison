const app = require('../pages/app.page');
const APP_ID = 'com.mobilecompare.app';

describe('MobileCompare app', () => {
  beforeEach(async () => {
    // fresh state per test, matching Maestro clearState / Detox delete:true
    await driver.terminateApp(APP_ID);
    if (driver.isAndroid) await driver.execute('mobile: clearApp', { appId: APP_ID }).catch(() => {});
    await driver.activateApp(APP_ID);
  });

  it('S1 login', async () => {
    await expect(app.loginScreen).toBeDisplayed();
    await app.login();
    await expect(app.welcome).toBeDisplayed();
  });

  it('S2+S3 add to cart and logout', async () => {
    await app.login();
    await app.addToCart.click();
    await expect(app.cartBadge).toHaveText('1');
    await app.logoutBtn.click();
    await expect(app.loginScreen).toBeDisplayed();
  });

  it('S4 invalid login', async () => {
    await app.login('wrong');
    await expect(app.error).toBeDisplayed();
    await expect(app.error).toHaveText('Invalid credentials');
  });
});
