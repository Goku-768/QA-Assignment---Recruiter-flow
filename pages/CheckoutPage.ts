import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  
  readonly cartIcon: Locator;
  readonly checkoutButton: Locator;
  readonly cartItems: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly finishMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.cartIcon = page.getByTestId('shopping-cart-link');
    this.checkoutButton = page.getByTestId('checkout');
    this.cartItems = page.getByTestId('cart-item');
    this.firstNameInput = page.getByTestId('firstName');
    this.lastNameInput = page.getByTestId('lastName');
    this.postalCodeInput = page.getByTestId('postalCode');
    this.continueButton = page.getByTestId('continue');
    this.finishButton = page.getByTestId('finish');
    this.finishMessage = page.getByTestId('complete-header');
  }

  async clickCart(): Promise<void> {
    await this.cartIcon.click();
  }

  async completeCheckout(firstName : string, lastName : string, postCode : string): Promise<void> {
    await this.checkoutButton.click();
    await this.fillInput(this.firstNameInput,firstName);
    await this.fillInput(this.lastNameInput,lastName);
    await this.fillInput(this.postalCodeInput,postCode);
    await this.continueButton.click();
  }

  async clickFinish(): Promise<void> {
    await this.finishButton.click();
  }
}