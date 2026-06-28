import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  
  private readonly cartIcon: Locator;
  private readonly checkoutButton: Locator;
  private readonly cartItems: Locator;
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly postalCodeInput: Locator;
  private readonly continueButton: Locator;
  private readonly finishButton: Locator;
  private readonly finishMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.cartIcon = page.getByTestId('shopping-cart-link');
    this.checkoutButton = page.getByTestId('checkout');
    this.cartItems = page.getByTestId('shopping-cart-badge');
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

  async getcarttemNumber():Promise<string>{
    return await this.cartItems.innerText()
  }

  getFinishMessage():Locator{
    return this.finishMessage
  }
}