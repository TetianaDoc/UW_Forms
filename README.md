# UW_Forms

[![Playwright Tests](https://github.com/TetianaDoc/UW_Forms/actions/workflows/playwright.yml/badge.svg)](https://github.com/TetianaDoc/UW_Forms/actions/workflows/playwright.yml)
[![Playwright Version](https://img.shields.io/badge/Playwright-v1.49.1-2EAD33?logo=playwright&logoColor=white)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-v5.7.3-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js Version](https://img.shields.io/badge/Node.js-%3E%3D18-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

Automated end-to-end (E2E) testing suite built with **[Playwright](https://playwright.dev/)** and **[TypeScript](https://www.typescriptlang.org/)** to validate modal form submissions, interactive UI components, and lazy-loaded layouts on [UserWay QA](https://qa.userway.dev/).

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Test Coverage & Scenarios](#-test-coverage--scenarios)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Available Scripts & Running Tests](#-available-scripts--running-tests)
  - [NPM Scripts Reference](#npm-scripts-reference)
  - [Running Targeted Tests](#running-targeted-tests)
- [Configuration & Environment](#️-configuration--environment)
- [Continuous Integration (CI)](#-continuous-integration-ci)
- [Reports & Debugging](#-reports--debugging)
- [Troubleshooting & Notes](#-troubleshooting--notes)

---

## 🔭 Overview

This project provides automated regression and verification test coverage for UserWay web applications:
- **Form Submissions & Validations**: Ensures modals and forms (such as "Request a Demo") display required fields, handle invalid and empty inputs gracefully, expose accessible error attributes (`aria-invalid`), and reset error feedback appropriately.
- **Widget Pricing & Layout Assertions**: Validates complete rendering of marketing and pricing sections across lazy-loaded pages via progressive programmatic scrolling.

---

## 🛠 Tech Stack

| Technology | Version / Target | Description |
| :--- | :--- | :--- |
| **Playwright Test** | `^1.49.1` | Cross-browser end-to-end automation test runner |
| **TypeScript** | `^5.7.3` | Strongly-typed JavaScript (ES2022 target, strict mode) |
| **Node.js** | `>= 18` | Runtime environment |
| **Supported Browsers** | Chromium, Firefox | Configured desktop browser engines |

---

## 📁 Project Structure

```text
UW_Forms/
├── .github/
│   └── workflows/
│       └── playwright.yml          # GitHub Actions CI workflow
├── tests/
│   ├── request_demo_form.spec.ts   # "Request a Demo" modal form assertions & validation
│   └── widget_pricing_tabs.spec.ts # Widget pricing page structure & lazy-loaded content verification
├── playwright.config.ts            # Playwright runner configuration (baseURL, retries, projects)
├── tsconfig.json                   # TypeScript compiler configuration (strict mode, ES2022)
├── package.json                    # Scripts and dependencies
├── .gitignore                      # Git ignore rules for reports, logs, and artifacts
└── README.md                       # Project documentation
```

---

## 🧪 Test Coverage & Scenarios

### 1. `tests/request_demo_form.spec.ts`
Tests the **"Request a Demo"** modal dialog triggered from the homepage:
- **Structural Integrity**: Verifies header title (`Request a Demo`), descriptive subtitle, editable business email field and label, submit button (`Continue`), terms of service link, privacy policy link, and close button.
- **Empty Email Validation**: Asserts that submitting without an email triggers `#email_error` and sets `aria-invalid="true"`.
- **Invalid Email Format**: Validates rejection of improperly formatted email strings with clear error feedback.
- **Error Recovery / State Clearance**: Confirms that validation errors disappear and `aria-invalid` returns to `"false"` once a valid email address is entered.
- **Modal Dismissal**: Verifies clicking the close button properly dismisses the modal dialog.

### 2. `tests/widget_pricing_tabs.spec.ts`
Tests the **/widget/** page layout and content delivery:
- **Lazy Load Simulation**: Uses a custom helper (`scrollToLoadAllContent`) to scroll down the DOM progressively and ensure dynamically hydrated sections are loaded into the page.
- **Content Heading Verification**: Validates all expected `<h2>` section headings across the entire widget page (e.g., pricing bundles, security & privacy, add-ons, FAQs).

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- [npm](https://www.npmjs.com/) (bundled with Node.js)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/TetianaDoc/UW_Forms.git
   cd UW_Forms
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Install required Playwright browser binaries:**
   ```bash
   npx playwright install
   ```
   *(Optional on Linux/CI: append `--with-deps` to install system browser dependencies)*

---

## ⚡ Available Scripts & Running Tests

### NPM Scripts Reference

| Command | Action |
| :--- | :--- |
| `npm test` | Run all tests headlessly in parallel across configured browsers |
| `npm run test:ui` | Open the interactive Playwright UI Mode with time-travel debugging |
| `npm run test:headed` | Run tests with visible browser windows |
| `npm run test:chromium` | Run tests only on Chromium (Desktop Chrome) |
| `npm run test:firefox` | Run tests only on Desktop Firefox |
| `npm run test:debug` | Run tests with Playwright Inspector enabled for step-by-step debugging |
| `npm run report` | Open the generated HTML test report in your default browser |
| `npm run typecheck` | Perform TypeScript type checking without emitting files (`tsc --noEmit`) |

### Running Targeted Tests

Run a specific test file:
```bash
npx playwright test tests/request_demo_form.spec.ts
```

Run tests matching a specific test title:
```bash
npx playwright test -g "Validate error message"
```

Run tests on a specific browser directly with Playwright CLI:
```bash
npx playwright test --project=chromium
```

---

## ⚙️ Configuration & Environment

Configuration is defined in [playwright.config.ts](playwright.config.ts):

- **Target Base URL**: Defaults to `https://qa.userway.dev`. Override via the `BASE_URL` environment variable:
  ```bash
  BASE_URL=https://userway.org npm test
  ```
- **Execution Settings**:
  - `fullyParallel: true` - Maximizes throughput by executing tests in parallel.
  - `retries: 1` - Automatically retries failed tests once to mitigate flakiness.
  - `ignoreHTTPSErrors: true` - Bypasses SSL certificate issues in staging/QA environments.
  - `viewport: { width: 1280, height: 720 }` - Standardized viewport size.
- **Diagnostics**:
  - `trace: 'on-first-retry'` - Saves full execution trace logs on retried failures.
  - `screenshot: 'only-on-failure'` - Automatically captures screenshots when a test fails.

---

## 🔄 Continuous Integration (CI)

Automated testing is configured via **GitHub Actions** in [.github/workflows/playwright.yml](.github/workflows/playwright.yml):
- **Triggers**:
  - Automatically runs on any `push` or `pull_request` targeting `main` or `master`.
  - Manual trigger support via `workflow_dispatch` (allowing custom `base_url` inputs).
- **Concurrency**: Automatically cancels in-progress runs on the same branch when new commits are pushed.
- **Workflow Pipeline**:
  1. Checks out repository code and sets up Node.js 20 with npm caching.
  2. Installs clean dependencies via `npm ci`.
  3. Verifies TypeScript types with `npm run typecheck`.
  4. Downloads Playwright browser binaries and system OS dependencies via `npx playwright install --with-deps chromium firefox`.
  5. Executes end-to-end tests across Chromium and Firefox.
  6. Uploads the HTML report artifact (`playwright-report/`) retained for 30 days, even if tests fail.

---

## 📊 Reports & Debugging

### HTML Test Reports
After running tests, an HTML report is generated in `playwright-report/`:
```bash
npm run report
```

### Inspecting Traces
When a test fails and retries, Playwright saves a trace file in `test-results/`. Inspect it using:
```bash
npx playwright show-trace test-results/<test-run-folder>/trace.zip
```

---

## 💡 Troubleshooting & Notes

- **WebKit on macOS 12**: WebKit is currently disabled in `playwright.config.ts` due to Playwright 1.49.1 frozen WebKit binary compatibility constraints on macOS Monterey (macOS 12). If running on macOS 13+ or Linux, you can re-enable the WebKit project in `playwright.config.ts`.
- **Handling Network Delays**: The suite uses `{ waitUntil: 'networkidle' }` on navigation to ensure complete asset loading before interacting with components.
