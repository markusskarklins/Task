import { Page } from '@playwright/test';

export default class HomePage {
    private page: Page;

    constructor(page: Page) {
    this.page = page;
  }

    async goTo(): Promise<void> {
        await this.page.goto('https://automationexercise.com/');
    }

    async addToCart(productName: string): Promise<void> {
        const productElements = await this.page.$$('.productinfo');

        for (const productElement of productElements) {
        const p = await productElement.$('p');
        if (p) {
            const productNameElement = await p.textContent();
            if (productNameElement === productName) {
            const addToCartButton = await productElement.$('.add-to-cart');
            if (addToCartButton) {
                await addToCartButton.click();
                console.log(`Clicked Add to cart button for ${productName}`);
                return;
            } else {
                console.error(`Add to cart button not found for ${productName}.`);
            }
            }
        } else {
            console.error(`Product ${productName} was not found.`);
        }
        }
    }

    async clickConsentIfPresent(): Promise<void> {
        const consentButton = await this.page.$('p.fc-button-label');
        if (consentButton) {
        await consentButton.click();
        console.log("Clicked Consent button on the home page");
        }
    }

    async clickCartLink(): Promise<void> {
        await this.page.click('a[href="/view_cart"]');
        console.log("Clicked Cart link on the home page");
    }
}
