import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';
import { CheckoutPage } from '../../pages/CheckoutPage';

test.describe('Checkout', () => {
  test('completes a full checkout flow and shows the confirmation message', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateTo('/');
    await loginPage.login('standard_user', 'secret_sauce');
    await page.waitForURL(/inventory/);

    const productsPage = new ProductsPage(page);
    await productsPage.addProductToCart('Sauce Labs Backpack');
    await productsPage.addProductToCart('Sauce Labs Fleece Jacket');
    await expect(productsPage.getCartBade()).toHaveText('2');

    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.clickCart();
    expect(await checkoutPage.getcarttemNumber()).toBe('2');

    await checkoutPage.completeCheckout('Gokul', 'Parakkottu', 'EX24AY');

    await expect(page).toHaveURL(/checkout-step-two/);

    await checkoutPage.clickFinish();

    await expect(checkoutPage.getFinishMessage()).toHaveText('Thank you for your order!');
  });
});
