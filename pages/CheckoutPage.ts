import { Page } from '@playwright/test';

export default class CheckoutPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async clickPlaceOrder(): Promise<void> {
    await this.page.click('a[href="/payment"].btn.check_out');
    console.log("Clicked Place Order button on the checkout page");
  }

  async fillAndConfirmPayment(nameOnCard: string, cardNumber: string, cvc: string, expiryMonth: string, expiryYear: string): Promise<void> {
    await this.page.fill('input[data-qa="name-on-card"]', nameOnCard);
    await this.page.fill('input[data-qa="card-number"]', cardNumber);
    await this.page.fill('input[data-qa="cvc"]', cvc);
    await this.page.fill('input[data-qa="expiry-month"]', expiryMonth);
    await this.page.fill('input[data-qa="expiry-year"]', expiryYear);

    await this.page.click('button[data-qa="pay-button"]');
    console.log("Payment confirmed");
  }
}