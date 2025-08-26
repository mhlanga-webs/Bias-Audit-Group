export interface ConfusionMatrix {
  truePositive: number;
  falsePositive: number;
  trueNegative: number;
  falseNegative: number;
}

export interface GroupData {
  name: string;
  total: number;
  metrics: ConfusionMatrix;
}

export interface ModelPerformanceData {
  scenario: string;
  description: string;
  demographics: {
    [key: string]: GroupData[];
  };
}

export interface FairnessMetric {
    name: string;
    value: number;
}

export interface FairnessResult {
    groupName: string;
    demographicParity: number;
    equalOpportunity: number;
    equalizedOddsFPR: number;
}