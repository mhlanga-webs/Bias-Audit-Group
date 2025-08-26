
import type { GroupData, FairnessResult } from '../types';

export const calculateFairnessMetrics = (group: GroupData): FairnessResult => {
  const { truePositive, falsePositive, trueNegative, falseNegative } = group.metrics;
  const total = group.total;

  // P(Prediction=1)
  const demographicParity = (truePositive + falsePositive) / total;

  // P(Prediction=1 | TrueLabel=1) = TP / (TP + FN)
  const actualPositives = truePositive + falseNegative;
  const equalOpportunity = actualPositives > 0 ? truePositive / actualPositives : 0;

  // P(Prediction=1 | TrueLabel=0) = FP / (FP + TN)
  const actualNegatives = falsePositive + trueNegative;
  const equalizedOddsFPR = actualNegatives > 0 ? falsePositive / actualNegatives : 0;

  return {
    groupName: group.name,
    demographicParity,
    equalOpportunity,
    equalizedOddsFPR,
  };
};
