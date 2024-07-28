exports.NewestPage = class NewestPage{
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page){
        this.page = page
        //naming convention:
        //<short description><Element type>
        this.ageLabel = page.locator('span.age')
        this.moreLink = page.locator('a.morelink')
    }

    async goto(){
        await this.page.goto('/newest')
    }
}