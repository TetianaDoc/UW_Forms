# UW_Forms

End-to-End automated testing suite built with [Playwright](https://playwright.dev/) and [TypeScript](https://www.typescriptlang.org/) for testing form submissions and widget UI components on [https://qa.userway.dev/](https://qa.userway.dev/).

---

## 🛠 Tech Stack

- **Testing Framework**: Playwright Test (`@playwright/test`)
- **Language**: TypeScript (ES2022 target, strict mode)
- **Browsers Supported**: Chromium (Desktop Chrome), Firefox (Desktop Firefox)

---

## 📁 Project Structure

```text
UW_Forms/
├── tests/
│   ├── request_demo_form.spec.ts   # "Request a Demo" modal form assertions
│   └── widget_pricing_tabs.spec.ts # Widget pricing page structure & lazy-load assertions
├── playwright.config.ts            # Playwright runner configuration (baseURL, timeouts, reporters)
├── tsconfig.json                   # TypeScript compiler configuration
├── package.json                    # Scripts and project dependencies
└── README.md                       # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/TetianaDoc/UW_Forms.git
   cd UW_Forms
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install Playwright browser binaries (if running for the first time):
   ```bash
   npx playwright install
   ```

---

## 🧪 Running Tests

### Execute all tests (headless by default):
```bash
npm test
```

### Run tests in interactive UI Mode:
```bash
npm run test:ui
```

### Run tests in headed browser mode:
```bash
npm run test:headed
```

### Run on a specific browser:
```bash
npm run test:chromium
npm run test:firefox
```

### Run a single test file:
```bash
npx playwright test tests/request_demo_form.spec.ts
```

### Run in debug mode:
```bash
npm run test:debug
```

### Type-check TypeScript files:
```bash
npm run typecheck
```

---

## 📊 Viewing Test Reports

Playwright generates an HTML report after test execution. To view the latest report:

```bash
npm run report
```

---

## ⚙️ Configuration & Environment

- **Target URL**: Defaults to `https://qa.userway.dev`. You can override the base URL via an environment variable:
  ```bash
  BASE_URL=https://userway.org npm test
  ```
- **WebKit Note**: WebKit is currently disabled on macOS 12 due to Playwright 1.49.1 frozen WebKit binary compatibility.
