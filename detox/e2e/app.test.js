const { device, element, by, expect } = require('detox');

const login = async (pw = 'Password123!') => {
  await element(by.id('email-input')).typeText('test@example.com');
  await element(by.id('password-input')).typeText(pw);
  await element(by.id('password-input')).tapReturnKey();
  await element(by.id('login-button')).tap();
};

describe('MobileCompare app', () => {
  beforeEach(async () => {
    await device.launchApp({ newInstance: true, delete: true });
  });

  it('S1 login', async () => {
    await expect(element(by.id('login-screen'))).toBeVisible();
    await login();
    await expect(element(by.id('welcome-text'))).toBeVisible();
  });

  it('S2+S3 add to cart and logout', async () => {
    await login();
    await element(by.id('add-to-cart-button')).tap();
    await expect(element(by.id('cart-badge'))).toHaveText('1');
    await element(by.id('logout-button')).tap();
    await expect(element(by.id('login-screen'))).toBeVisible();
  });

  it('S4 invalid login', async () => {
    await login('wrong');
    await expect(element(by.id('error-message'))).toHaveText('Invalid credentials');
  });
});
