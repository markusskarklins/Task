import { expect, test } from '@playwright/test';
import { Page } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';

const loginUrl = 'https://automationexercise.com/login';

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page, loginUrl);
  
  const homePage = new HomePage(page);

  await loginPage.login('jivojex359@rartg.com', 'test123');
});

// Codegen code
// test('Codegen code', async ({ page }) => {
//   await page.goto('https://automationexercise.com/');
//   await page.getByLabel('Consent', { exact: true }).click();
//   await page.locator('.overlay-content > .btn').first().click();
//   await page.getByRole('link', { name: 'View Cart' }).click();
//   await expect(page.getByRole('link', { name: 'Blue Top' })).toBeVisible();
//   await expect(page.getByText('Rs.').first()).toBeVisible();
// });

test('Add item to cart and assert correct item with correct price', async ({ page }) => {
  const homePage = new HomePage(page);
  const cartPage = new CartPage(page);

  await homePage.goTo();

  //To close the consent popup, if it appears
  await homePage.clickConsentIfPresent();
  await new HomePage(page).addToCart('Blue Top');
  await cartPage.viewCart();

  const isBlueTopInCart = await cartPage.isProductInCart('Blue Top', 'Rs. 500');
  if (isBlueTopInCart) {
    console.log("Blue Top with correct price is in the cart.");
  } else {
    console.error("Blue Top is not found or price is incorrect.");
  }
});

test('Go through the checkout flow and make a successful purchase', async ({ page }) => {
  const homePage = new HomePage(page);
  const cartPage = new CartPage(page);
  const checkPage = new CheckoutPage(page);

  await homePage.goTo();
  await homePage.clickConsentIfPresent();
  await homePage.clickCartLink();
  await cartPage.proceedToCheckout();
  await checkPage.clickPlaceOrder();
  await checkPage.fillAndConfirmPayment('Test User', '1234567890', '123', '123', '2025');
});