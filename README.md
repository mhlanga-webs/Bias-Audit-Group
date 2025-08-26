# AI Bias Audit & Mitigation Toolkit

An interactive web application to analyze bias in machine learning models, understand fairness metrics, explore mitigation strategies, and generate ethical frameworks for responsible AI deployment.

## Features

-   **Interactive Bias Analysis:** Toggle between a biased "Original Model" and a fairness-corrected "Mitigated Model" to see the impact in real-time.
-   **Multiple Demographic Views:** Analyze bias across different demographic categories like Gender, Race, or other custom groups.
-   **Key Fairness Metrics:** Understand concepts like Demographic Parity and Equal Opportunity through clear visualizations and tooltips.
-   **Generative AI Insights:** Leverage the Google Gemini API to generate an ethics framework or get actionable recommendations for improving your dataset.

## How to Run

This application is designed to run directly in your web browser. No complex setup is required.

1.  Ensure you have all the project files (`index.html`, `index.tsx`, etc.) in the same folder.
2.  Open the `index.html` file in a modern web browser (like Chrome, Firefox, or Edge).

That's it! The application will load and be ready to use.

### API Key Configuration

The Generative AI features require a Google Gemini API key. For this demonstration, the key has been configured directly within the `index.html` file.

If you need to change the key in the future, you can find it inside a `<script>` tag near the top of the `index.html` file.

---

*This application was built for demonstration purposes.*