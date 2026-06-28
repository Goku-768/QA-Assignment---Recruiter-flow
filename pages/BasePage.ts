import { Page,Locator } from '@playwright/test';

export abstract class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(url:string): Promise<void>{
    await this.page.goto(url);
   }

  async fillInput(element:Locator,value:string):Promise<void>{
    await element.fill(value);
  }

  async clickElement(element:Locator):Promise<void>{
    await element.click();
  }
}