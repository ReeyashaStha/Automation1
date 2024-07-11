const { test, expect } = require("@playwright/test");
const testData = require("../../fixtures/loginFixture.json");
const {getCurrentTimeStamp,authenticateUser1} = require('../../utils/helper.spec.js');
const { access } = require("fs");
let interceptId;
test.beforeEach(async ({ page }) => {
  await page.goto("https://thinking-tester-contact-list.herokuapp.com/");
  await page.locator("#email").fill(testData.validcontact.email);
  await page.locator("#password").fill(testData.validcontact.password);
  await page.locator("#submit").click();
});
test.describe("add edit for contact", () => {
  test("add contact", async ({ page }) => {
    await page.locator("#add-contact").click();
    await page.locator("#firstName").fill(testData.validcontact.firstName);
    await page.locator("#lastName").fill(testData.validcontact.lastName);
    await page.locator("#submit").click();
  })
  
})

test.describe("test edit",()=>{
  test('contact edit test',async({context,page,request})=>{
    const contact =new ContactPage(page);
    const Data = {"firstName":"Hello","lastName":"World"};
    const accessToken = await authenticateUser1({Request});
    const entityId = await createEntity(Data, accessToken, '/contacts',{request});
    await intercept('https://thinking-tester-contact-list.herokuapp.com/',{context,page});
    page.reload();
    await contact.contactEdit();
    await page.waitForTimeout(5000);
    await deleteEntity(accessToken, `/contacts/${interceptId}`,{request});
  })
})

async function intercept(module, { context, page}){
  await context.route(module, async route =>{
    await route.continue();
    const response = await page. waitForResponse(module);
    page.waitForTimeout(5000);
    const responseBody = await response.json();
    interceptId = responseBody._id;
  });
}

test('Contact delete test',async ({context, page, request })=>{
  await intercept('**/contacts',{context, page});
  const contact = new ContactPage(page);
  const Data = { "firstName": "hello", "lastName": "world"};
  const accessToken = await authenticateUser1({request});
  const entityId = await createEntity(Data, accessToken, '/contacts', {request});
    page.reload();
    page.on('dialog', async dialog=>{
      console.log(dialog,message());
      await dialog.accept();
    });
    await contact.contactDelete();
    await page.waitForTimeout(3000);
})