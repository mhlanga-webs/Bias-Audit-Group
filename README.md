# AI Bias Audit & Mitigation Toolkit

An interactive web application to analyze bias in machine learning models, understand fairness metrics, explore mitigation strategies, and generate ethical frameworks for responsible AI deployment.

## Features

-   **Interactive Bias Analysis:** Toggle between a biased "Original Model" and a fairness-corrected "Mitigated Model" to see the impact in real-time.
-   **Multiple Demographic Views:** Analyze bias across different demographic categories like Gender, Race, or other custom groups.
-   **Key Fairness Metrics:** Understand concepts like Demographic Parity and Equal Opportunity through clear visualizations and tooltips.
-   **Generative AI Insights:** Leverage the Google Gemini API to generate an ethics framework or get actionable recommendations for improving your dataset.

## Local Development Setup

To run this application on your local machine and use the Generative AI features, you need to configure your environment.

### Prerequisites

You need a modern web browser. All dependencies are loaded via a CDN, so no `npm install` is required for the frontend libraries.

### 1. Set Up Your API Key

The Generative AI features require a Google Gemini API key.

1.  **Create an environment file:**
    In the root of the project, create a new file named `.env` by copying the example file:
    ```bash
    cp .env.example .env
    ```

2.  **Add your API key:**
    Open the newly created `.env` file and replace `"YOUR_GEMINI_API_KEY"` with your actual Google Gemini API key.

    ```
    API_KEY="your-real-api-key-goes-here"
    ```

    The `.env` file is listed in `.gitignore`, so your secret key will never be committed to your git repository.

### 2. Running the Application

This application is designed as a set of static files (`index.html`, etc.) that use modern JavaScript modules. However, the code in `services/geminiService.ts` uses `process.env.API_KEY` to access your API key. This is a Node.js feature that doesn't work directly in a browser for security reasons.

To make it work locally, you need to use a development server that can read your `.env` file and make the variables available to the application. The simplest way to do this is with a tool like **Vite**.

If you were to set up Vite for this project, it would handle this automatically. For now, be aware that simply opening `index.html` in your browser will **not** make the Generative AI features work. You need a development environment that manages environment variables.

---

*This application was built for demonstration purposes.*
