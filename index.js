// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1
const { chromium } = require("playwright");
const { expect } = require('@playwright/test')
const {NewestPage} = require('./pages/NewestPage')
const {compareTimes} = require('./utils/stringModifiers')

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

async function sortHackerNewsArticles() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  const newestPage = new NewestPage(page)
  page.goto('https://news.ycombinator.com/newest')
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
  browser.close()
}

(async () => {
  await sortHackerNewsArticles();
})();
