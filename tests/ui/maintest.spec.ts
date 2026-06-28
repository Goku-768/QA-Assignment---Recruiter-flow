import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
  
test.describe('Login', () => {
  test('standard_user can log in and lands on the products page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productPage = new ProductsPage(page)
    await loginPage.navigateTo('/');
    await loginPage.login('standard_user', 'secret_sauce');

    await expect(page).toHaveURL(/inventory/);
    await expect(await productPage.getTitle()).toContain('Products');
  });

  test('locked_out_user sees an error and stays on the login page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateTo('/');
    await loginPage.login('locked_out_user', 'secret_sauce');
    await expect(loginPage.getErrorMessage()).toContainText('Sorry, this user has been locked out.');
    await expect(page).toHaveURL('/');
  });
});

test.describe('Checkout', () => {
  test('completes a full checkout flow and shows the confirmation message', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateTo('/')
    await loginPage.login('standard_user', 'secret_sauce');
    await page.waitForURL(/inventory/);

    const productsPage = new ProductsPage(page);
    await productsPage.addProductToCart('Sauce Labs Backpack');
    await productsPage.addProductToCart('Sauce Labs Fleece Jacket');
    await expect(productsPage.getCartBade()).toHaveText('2');

    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.clickCart();
     expect(await checkoutPage.getcarttemNumber()).toBe('2');

    await checkoutPage.completeCheckout('Gokul','Parakkottu', 'EX24AY');

    await expect(page).toHaveURL(/checkout-step-two/);

    await checkoutPage.clickFinish();

    await expect(checkoutPage.getFinishMessage()).toHaveText('Thank you for your order!');
  });
});


test.describe('Cart', () => {

  test.beforeEach(async({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateTo('/')
    await loginPage.login('standard_user', 'secret_sauce');
    await page.waitForURL(/inventory/);
  })  

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

    // The first item must be the minimum price across all visible products.
    expect(firstPrice).toBe(Math.min(...prices));
  });
});



