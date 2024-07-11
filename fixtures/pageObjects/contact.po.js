const { test, expect } = require("@playwright/test");
exports.ContactPage = class ContactPage{
    async fillData(firstName,lastName){
        await this.page.locator(this.firstName),fill(firstName);
        await this.page.locator(this.lastName),fill(lastName);
        await this.page.locator(this.submit).click();
    }

    async contactEdit(){
        await this.page.locator(this.editCreated).click();
        await this.page.locator(this.editContact).click();
        await this.page.locator(this.FirstName).fill("Hello");
        await this.page.locator(this.LastName).fill("World");
        await this.page.locator(this.submit).click();

    }

}
