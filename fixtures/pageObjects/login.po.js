const {expect}=require("@playwright/test");

exports.LoginPage = class LoginPage{
    constructor(page){
        this.page = page;
        this.usernameInput='[placeholder="Email"]';
        this.passwordInput='[placeholder="Password"]';
        this.loginButton='submit';
    }

    async login(username,password){
        await this.page.locator(this.usernameInput).fill(username);
        await this.page.locator(this.passwordInput).fill(password);
        await this.page.locator(this.loginButton).click();
    }

    async verifyUsernameEmptyFields(){  
        const verifyEmptyUsername = await this.page.locator(this.userNameEmptyFields)
        await expect(verifyEmptyUsername).toHaveText('Username is required')
    }

    async verifyPasswordEmptyFields(){  
        const verifyUsernameEmptyFields = await this.page.locator(this.userNameEmptyFields)
        await expect(verifyUsernameEmptyFields).toHaveText('Username is required')
    }
}