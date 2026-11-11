const BasePage = require('./base.page');
class AppPage extends BasePage {
  get loginScreen() { return this.el('login-screen'); }
  get email() { return this.el('email-input'); }
  get password() { return this.el('password-input'); }
  get loginBtn() { return this.el('login-button'); }
  get welcome() { return this.el('welcome-text'); }
  get addToCart() { return this.el('add-to-cart-button'); }
  get cartBadge() { return this.el('cart-badge'); }
  get logoutBtn() { return this.el('logout-button'); }
  get error() { return this.el('error-message'); }

  async login(pw = 'Password123!') {
    await this.email.setValue('test@example.com');
    await this.password.setValue(pw);
    if (driver.isAndroid && (await driver.isKeyboardShown())) await driver.hideKeyboard();
    await this.loginBtn.click();
  }
}
module.exports = new AppPage();
