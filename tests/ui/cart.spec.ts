import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';

test.describe('Cart', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateTo('/');
    await loginPage.login('standard_user', 'secret_sauce');
    await page.waitForURL(/inventory/);
  });

  test('adding two products updates the cart badge to 2', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.addProductToCart('Sauce Labs Backpack');
    await productsPage.addProductToCart('Sauce Labs Bike Light');

    await expect(productsPage.getCartBade()).toHaveText('2');
  });

  test('sort by "Price (low to high)" puts the cheapest product first', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.sortBy('Price (low to high)');

    const prices = await productsPage.allProductPrices();
    const firstPrice = await productsPage.firstProductPrice();

    expect(firstPrice).toBe(Math.min(...prices));
  });
});
