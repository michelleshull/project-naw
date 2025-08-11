# 📜 US Constitution Scraper & Patriotic Diff™

> Guarding the Constitution, one automated test at a time.

![Playwright](https://img.shields.io/badge/Playwright-automation-blueviolet?logo=playwright)
![Tests](https://img.shields.io/badge/tests-passing-brightgreen)
![Contributions welcome](https://img.shields.io/badge/contributions-welcome-orange)

---

## ✨ Features

- 🤖 Automated scraping of the official US Constitution site  
- 📂 Structured JSON output for programmatic use  
- 📄 Markdown output for easy human review  
- 🛡 Baseline tracking: committed snapshots of each document  
- 🔍 Patriotic Diff™: granular change detection at section/paragraph level  
- ⚙️ CI/CD friendly: fail builds if text changes unexpectedly  
- 🧩 Config-driven: easy to expand or repoint to other sources  

---

## 🗂 Project Structure
    📦 project-root
    ┣ 📂 data
    ┃ ┣ 📂 articles # Baseline JSON for Preamble + Articles
    ┃ ┣ 📂 amendments # Baseline JSON for Amendments
    ┃ ┣ 📂 markdown # Generated Markdown for human review
    ┃ ┗ 📂 diffs # Diff reports generated on change
    ┣ 📂 src
    ┃ ┣ 📂 pages # Page Object Model classes for scraping
    ┃ ┗ 📂 utils # Formatters, exporters, diff utilities
    ┣ 📂 tests
    ┃ ┣ 🧪 articleScraper.spec.js
    ┃ ┣ 🧪 amendmentScraper.spec.js
    ┃ ┣ 🧪 diffArticlesAgainstBaseline.spec.js
    ┃ ┗ 🧪 diffAmendmentsAgainstBaseline.spec.js
    ┣ 📜 config.js # URLs and settings
    ┣ 📜 package.json
    ┣ 📜 README.md
    ┗ 📜 LICENSE

## 🚀 Getting Started

### 1️⃣ Install dependencies
`npm install`

### 2️⃣ Configure URLs
Edit `config.js` to point to your desired US Constitution source.

### 3️⃣ Run a scrape

`npx playwright test tests/articleScraper.spec.js`
`npx playwright test tests/amendmentScraper.spec.js`
This will:

- Navigate to each document

- Scrape clean, normalized text

- Save as data/articles/article-{n}.json & .md

- Create or update baselines if missing

### 4️⃣ Run the Patriotic Diff™

`npx playwright test tests/diffArticlesAgainstBaseline.spec.js`
`npx playwright test tests/diffAmendmentsAgainstBaseline.spec.js`

- If differences are found, a Markdown diff report is written to data/diffs/.

### 5️⃣ Approve changes (update baseline)

#### macOS/Linux
`UPDATE_BASELINE=1 npx playwright test tests/diffArticlesAgainstBaseline.spec.js`
`UPDATE_BASELINE=1 npx playwright test tests/diffAmendmentsAgainstBaseline.spec.js`
#### Windows PowerShell
`$env:UPDATE_BASELINE="1"; npx playwright test tests/diffArticlesAgainstBaseline.spec.js`
`$env:UPDATE_BASELINE="1"; npx playwright test tests/diffAmendmentsAgainstBaseline.spec.js`

## 📋 Example Diff Report
### Diff Report: article-3

**Baseline:** `./data/articles/article-3.json`
**Generated:** 2025-08-11T12:34:56Z

**Summary:** Added: 0 • Removed: 0 • Modified: 1

### ✏️ Modified
- Section 2, Paragraph 1
  - **Before:** The judicial Power shall extend to all Cases, in Law and Equity...
  - **After:**  The judicial Power shall extend to all cases, in Law and Equity...

## 🤝 Contributing
- Fork & clone the repo

- Create a feature branch

- Add your changes (tests, scrapers, etc.)

- Submit a pull request

## 📜 License
- MIT License — see LICENSE for details.

## 💡 Inspiration
This project was built to:

- Showcase robust SDET-level automation with Playwright

- Preserve historical text integrity

- Serve as a portfolio-ready example of clean, modular test architecture

"We the People…" now includes We the Testers. 
