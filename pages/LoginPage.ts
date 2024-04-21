import { Page } from '@playwright/test';
import HomePage from './HomePage';

export default class LoginPage {
  private page: Page;
  private loginUrl: string;

  constructor(page: Page, loginUrl: string) {
    this.page = page;
    this.loginUrl = loginUrl;
  }

  async goToLogin(): Promise<void> {
    await this.page.goto(this.loginUrl);
  }

  async login(email: string, password: string): Promise<void> {
    await this.goToLogin();
    await this.page.fill('input[data-qa="login-email"]', email);
    await this.page.fill('input[data-qa="login-password"]', password);
    
    const homePage = new HomePage(this.page);
    await homePage.clickConsentIfPresent();
    
    await this.page.click('button[data-qa="login-button"]');
    console.log("Logged in successfully");
  }
}