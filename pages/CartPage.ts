// CartPage.ts
import { Page } from '@playwright/test';

export default class CartPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async viewCart(): Promise<void> {
    const viewCartLink = await this.page.$('.modal-content a[href="/view_cart"]');
    if (viewCartLink) {
      await viewCartLink.click();
      console.log("Clicked View Cart link in the modal");
      await this.page.waitForSelector('#cart_info_table');
    } else {
      console.error("View Cart link not found in the modal.");
    }
  }

  async isProductInCart(productName: string, expectedPrice: string): Promise<boolean> {
    const isProductPresent = await this.page.$eval(
      '#cart_info_table',
      (table: HTMLElement, args: { productName: string, expectedPrice: string }) => {
        const productRows = Array.from(table.querySelectorAll('tbody tr'));

        for (const row of productRows) {
          const productNameCell = row.querySelector('.cart_description h4');
          const productPriceCell = row.querySelector('.cart_price p');

          if (productNameCell && productPriceCell) {
            const productNameText = productNameCell.textContent?.trim();
            const productPriceText = productPriceCell.textContent?.trim();

            if (productNameText === args.productName && productPriceText === args.expectedPrice) {
              return true;
            }
          }
        }

        return false;
      },
      { productName, expectedPrice }
    );

    return !!isProductPresent;
  }

  async proceedToCheckout(): Promise<void> {
    await this.page.click('.btn.check_out');
    console.log("Clicked Proceed To Checkout button");
  }

  async clickRegisterOrLoginIfPresent(): Promise<void> {
    const registerLoginLink = await this.page.$('p.text-center a[href="/login"]');
    if (registerLoginLink) {
      await registerLoginLink.click();
      console.log("Clicked Register / Login link");
    } else {
      console.log("Register / Login link not found");
    }
  }
}
