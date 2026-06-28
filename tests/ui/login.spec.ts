import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';

test.describe('Login', () => {
  test('standard_user can log in and lands on the products page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productPage = new ProductsPage(page);
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
