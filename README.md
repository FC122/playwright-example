
# Playwright Example
Welcome to the Playwright Project! This README will guide you through the setup, usage, and development process for our Playwright-based automated testing framework.

## Introduction
Playwright is a Node.js library that provides a high-level API to interact with browsers and automate web application testing. This project leverages Playwright to provide a robust and scalable testing framework.

## Features
- Cross-browser testing (Chromium, Firefox, WebKit)
- Parallel test execution
- Visual testing and screenshots
- Network interception and mocking
- Automatic waiting for elements and actions
- CI/CD integration ready

## Prerequisites
Ensure you have the following software installed:

- Node.js (version 14 or higher)
- npm or yarn

## Installation
Clone the repository:

```
git clone https://github.com/FC122/playwright-example
```
then:
```
cd playwright-project
```

Install dependencies:

```
npm install
```
or
```
yarn install
```

Install Playwright browsers:
```
npx playwright install
```

## Usage
To run the Playwright tests, use the following command:
```
npx playwright test
```

### Page Object Model (POM)
The Page Object Model is a design pattern that creates an object repository for web UI elements. This makes tests more readable, maintainable, and reusable.

#### Creating a Page Object
1. Create a new file in the pages directory, e.g., pages/examplePage.js.
2. Define a class representing the page and its elements.
Example pages/examplePage.js:

```js
class ExamplePage {
  constructor(page) {
    this.page = page;
    this.exampleElement = page.locator('selector-for-element');
  }

  async navigate() {
    await this.page.goto('https://example.com');
  }

  async getExampleElementText() {
    return await this.exampleElement.textContent();
  }
}

module.exports = ExamplePage;
```
#### Using the Page Object in Tests
1. Import the page object in your test file.
2. Instantiate the page object and use its methods in your tests.
Example tests/example.spec.js:

```js
const { test, expect } = require('@playwright/test');
const ExamplePage = require('../pages/examplePage');

test('example page test', async ({ page }) => {
  const examplePage = new ExamplePage(page);
  
  await examplePage.navigate();
  const text = await examplePage.getExampleElementText();
  
  expect(text).toBe('Expected Text');
});
```

### Configuration
Configuration for Playwright can be found in the playwright.config.js file. Here you can specify browser options, test directories, and other settings.

Example playwright.config.js:
```js
const { devices } = require('@playwright/test');

module.exports = {
  timeout: 30000,
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
};
```
### Writing Tests
Tests are located in the tests directory. Each test file should follow the .spec.js or .test.js naming convention.

Example test file tests/example.spec.js:

```js
const { test, expect } = require('@playwright/test');

test('basic test', async ({ page }) => {
  await page.goto('https://example.com');
  const title = await page.title();
  expect(title).toBe('Example Domain');
});
```

### Running Tests
Run all tests:
```
npx playwright test
```

Run tests in a specific file:
```
npx playwright test tests/example.spec.js
```

Run tests with a specific project configuration (e.g., Chromium):
```
npx playwright test --project=chromium
```

### CI/CD Integration
Integrate Playwright tests into your CI/CD pipeline by adding the following commands to your pipeline configuration:

Example for GitHub Actions:

```yaml
Copy code
name: Playwright Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '14'
      - name: Install dependencies
        run: npm install
      - name: Install Playwright browsers
        run: npx playwright install
      - name: Run tests
        run: npx playwright test
```

## Contributing
We welcome contributions to the Playwright Project. Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (git checkout -b feature-branch).
3. Make your changes and commit them (git commit -m 'Add new feature').
4. Push to the branch (git push origin feature-branch).
5. open a pull request.

## License
The MIT License (MIT)
Copyright © 2024 <copyright holders>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.