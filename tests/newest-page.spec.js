const { test, expect } = require('@playwright/test')
const {NewestPage} = require('../pages/NewestPage')
const {compareTimes} = require('../utils/stringModifiers')

/**
 * Checks that elements on the screen are sorted
 * @param {NewestPage} newestPage 
 */
async function checkAgeLabels(newestPage) {
    let currentElementContent, nextElementContent
    for (let i = 0; i < 29; i++) {
        currentElementContent = await newestPage.ageLabel.nth(i).textContent()
        nextElementContent = await newestPage.ageLabel.nth(i+1).textContent()
        expect(compareTimes(currentElementContent, nextElementContent)).toBeGreaterThanOrEqual(0)
    }
    return nextElementContent
}

test('Check that first 100 articles are sorted from newest to oldest', async ({page})=>{
    const newestPage = new NewestPage(page)
    await newestPage.goto()
    let lastElementContent, nextElementContent
    //first 90 elements
    for (let i = 1; i <= 3; i++) {
        lastElementContent = await checkAgeLabels(newestPage)
        await newestPage.moreLink.click()
        nextElementContent = await newestPage.ageLabel.nth(0).textContent()
        expect(compareTimes(lastElementContent, nextElementContent)).toBeGreaterThanOrEqual(0)
    }
    //last 10
    for (let i = 0; i < 9; i++) {
        let currentElementContent = await newestPage.ageLabel.nth(i).textContent()
        let nextElementContent = await newestPage.ageLabel.nth(i + 1).textContent()
        expect(compareTimes(currentElementContent, nextElementContent)).toBeGreaterThanOrEqual(0)
    }
})