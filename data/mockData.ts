import type { ModelPerformanceData } from '../types';

// Biased data shows a clear disparity in approval rates and error rates between groups.
export const biasedData: ModelPerformanceData = {
  scenario: "Loan Approval Model (Biased)",
  description: "An initial model showing significant bias. Certain groups have a much lower approval rate and a higher false negative rate, meaning qualified applicants from this group are unfairly rejected.",
  demographics: {
    "Default": [
      {
        name: 'Group A',
        total: 1000,
        metrics: { truePositive: 450, falsePositive: 50, trueNegative: 450, falseNegative: 50 },
      },
      {
        name: 'Group B',
        total: 1000,
        metrics: { truePositive: 250, falsePositive: 50, trueNegative: 450, falseNegative: 250 },
      },
    ],
    "Gender": [
      {
        name: 'Male',
        total: 1000,
        metrics: { truePositive: 400, falsePositive: 60, trueNegative: 440, falseNegative: 100 },
      },
      {
        name: 'Female',
        total: 1000,
        metrics: { truePositive: 200, falsePositive: 40, trueNegative: 560, falseNegative: 200 },
      },
    ],
    "Race": [
      {
        name: 'Caucasian',
        total: 1000,
        metrics: { truePositive: 480, falsePositive: 70, trueNegative: 400, falseNegative: 50 },
      },
      {
        name: 'Minority',
        total: 1000,
        metrics: { truePositive: 220, falsePositive: 30, trueNegative: 450, falseNegative: 300 },
      },
    ]
  }
};

// Mitigated data shows more equitable outcomes after applying fairness techniques.
export const mitigatedData: ModelPerformanceData = {
  scenario: "Loan Approval Model (Mitigated)",
  description: "After applying mitigation techniques like reweighing, the model's outcomes are more equitable. The approval rates and error rates between groups are now much closer across all demographics.",
  demographics: {
    "Default": [
       {
        name: 'Group A',
        total: 1000,
        metrics: { truePositive: 410, falsePositive: 80, trueNegative: 420, falseNegative: 90 },
      },
      {
        name: 'Group B',
        total: 1000,
        metrics: { truePositive: 390, falsePositive: 95, trueNegative: 405, falseNegative: 110 },
      },
    ],
    "Gender": [
      {
        name: 'Male',
        total: 1000,
        metrics: { truePositive: 400, falsePositive: 85, trueNegative: 415, falseNegative: 100 },
      },
      {
        name: 'Female',
        total: 1000,
        metrics: { truePositive: 380, falsePositive: 90, trueNegative: 420, falseNegative: 110 },
      },
    ],
     "Race": [
      {
        name: 'Caucasian',
        total: 1000,
        metrics: { truePositive: 420, falsePositive: 80, trueNegative: 400, falseNegative: 100 },
      },
      {
        name: 'Minority',
        total: 1000,
        metrics: { truePositive: 400, falsePositive: 90, trueNegative: 390, falseNegative: 120 },
      },
    ]
  }
};