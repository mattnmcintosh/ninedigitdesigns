# 9 Digit Designs — Enterprise SPA Migration

A modern, high-performance single-page application (SPA) migrated from an unstable WordPress runtime architecture to a decoupled, resilient React & Vite frontend hosted globally on Netlify. 

## 🏗️ Architectural Overview & Engineering Decisions

This project was engineered to solve critical production failures inherent in traditional tightly-coupled CMS hosting:
* **Elimination of Runtime Fragility:** Moved away from unstable serverless API proxying that suffered from path-resolution errors and third-party script injection (e.g., WordPress marketing bars).
* **Decoupled Static Data Model:** Converted raw WordPress WXR XML exports into structured, locally managed JSON payloads (`src/data/wordpressContent.json`), achieving lightning-fast load times and zero external network dependencies for page rendering.
* **Global Edge Hosting:** Deployed via Netlify with automated CI/CD validation pipelines, secure asset caching, and native client-side routing.

## 🔒 Security & Resiliency
* **Attack Surface Reduction:** Stripped out unvalidated remote script injections and dynamic rendering loops, ensuring zero unauthorized external execution vectors.
* **Graceful Degradation:** Implemented defensive rendering checks and fallback states across data consumers to prevent white-screen crashes on missing payloads.

## ⚡ Performance & Optimization
* **Optimized Bundling:** Leveraged Vite for lightning-fast module hot replacement (HMR) and highly optimized tree-shaking during production builds.
* **Asset Integrity:** Decoupled media handling from runtime API constraints to ensure consistent asset delivery speeds.

## 🛠️ Tech Stack

* **Frontend:** React 18, Vite, Material-UI (MUI)
* **Data Layer:** Local JSON / Static Asset Bundling
* **Testing & Quality:** Vitest, React Testing Library
* **Deployment & CI/CD:** Netlify, GitHub Actions

## 🚀 Getting Started Locally

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/ninedigitdesigns.git](https://github.com/your-username/ninedigitdesigns.git)
   cd ninedigitdesigns

Install dependencies: npm install
Run the development server: npm run dev
Run the test suite: npx vitest run
Build for production: npm run build