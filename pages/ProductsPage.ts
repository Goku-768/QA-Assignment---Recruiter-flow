import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductsPage extends BasePage {
  private readonly cartBadge: Locator;
  private readonly sortDropdown: Locator;
  private readonly productPrices: Locator;
  private readonly pageTitle : Locator

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.getByTestId('title');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
    this.sortDropdown = page.getByTestId('product-sort-container');
    this.productPrices = page.getByTestId('inventory-item-price');
  }

  async addProductToCart(productName: string): Promise<void> {
    const item = this.page.getByTestId('inventory-item').filter({ hasText: productName });
    await item.getByRole('button', { name:"Add to cart"}).click();
  }

  async sortBy(option: string): Promise<void> {
    await this.sortDropdown.selectOption({ label: option });
  }

  async firstProductPrice(): Promise<number> {
    const text = await this.productPrices.first().innerText();
    return Number(text.replace('$', ''));
  }

  async allProductPrices(): Promise<number[]> {
    const prices: number[] = [];
    for (const text of await this.productPrices.allInnerTexts()) {
    prices.push(Number(text.replace('$', '')));
    }
    return prices;
  }

  async getTitle():Promise<string>{
    return await this.pageTitle.innerText();
  }

  getCartBade():Locator{
    return this.cartBadge
  }

}
