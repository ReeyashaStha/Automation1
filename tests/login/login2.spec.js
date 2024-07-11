const { test, expect } = require('@playwright/test');
import { LoginPage } from '../../fixtures/pageObjects/login.po.js';
const testdata = require('../../fixtures/loginFixture.json');
test.beforeEach(async({page})=>{
    await page.goto('https://thinking-tester-contact-list.herokuapp.com')
      // await page.goto('/');
  })
  
  test('has title', async ({ page }) => {
      //await page.goto('https://www.facebook.com');
    
      // Expect a title "to contain" a substring.
      await expect(page).toHaveTitle(/thinkingTester/);
    });

test(' title', async ({ page }) => {
    await page.getByTestId('submit').click();

    
    // Expect a title "to contain" a substring.
    //await expect(page).toHaveTitle(/Facebook/);
});
test.describe('Valid Login Tests',() => {
    test(' Login using valid username and password', async ({ page }) => {

        const login = new LoginPage(page);
        await login.login(testdata.validUser.userName,testdata.validUser.password)
        await page.getByTestId('submit').click();
        await expect(page.locator('//')).toBeVisible()
        await expect(page.locator('//')).toHaveText

    });
});


