import React, { useMemo, useState } from 'react';
import type { ModelPerformanceData, FairnessResult } from '../types';
import { calculateFairnessMetrics } from '../utils/fairnessCalculations';
import MetricCard from './MetricCard';
import BiasChart from './BiasChart';
import RecommendationBox from './RecommendationBox';
import { ShieldCheck, AlertTriangle, Users, Info } from 'lucide-react';

interface DashboardProps {
  data: ModelPerformanceData;
  isMitigated: boolean;
}

const metricDescriptions = {
    demographicParity: "Measures whether the proportion of positive outcomes (e.g., loan approvals) is similar across different groups. A value near 1.0 indicates parity.",
    equalOpportunity: "Measures whether people who are qualified have an equal chance of being correctly identified, regardless of their group. Focuses on True Positive Rates.",
    equalizedOdds: "A stricter metric that requires both the True Positive Rate (Equal Opportunity) and the False Positive Rate to be equal across groups.",
};

const Dashboard: React.FC<DashboardProps> = ({ data, isMitigated }) => {
  const demographicCategories = Object.keys(data.demographics);
  const [selectedDemographic, setSelectedDemographic] = useState<string>(demographicCategories[0] || 'Default');

  const fairnessResults: FairnessResult[] = useMemo(() => {
    const activeGroups = data.demographics[selectedDemographic] || [];
    return activeGroups.map(group => calculateFairnessMetrics(group));
  }, [data, selectedDemographic]);

  const demographicParityDisparity = useMemo(() => {
      if (fairnessResults.length < 2) return 0;
      return Math.abs(fairnessResults[0].demographicParity - fairnessResults[1].demographicParity);
  }, [fairnessResults]);

  const equalOpportunityDisparity = useMemo(() => {
      if (fairnessResults.length < 2) return 0;
      return Math.abs(fairnessResults[0].equalOpportunity - fairnessResults[1].equalOpportunity);
  }, [fairnessResults]);
  
  // Handle case where data for a selected demographic might not exist in a subsequent render
  React.useEffect(() => {
    if (!data.demographics[selectedDemographic]) {
      setSelectedDemographic(demographicCategories[0] || 'Default');
    }
  }, [data, selectedDemographic, demographicCategories]);

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold text-white flex items-center mb-2">
            {isMitigated ? <ShieldCheck className="w-7 h-7 mr-3 text-green-400" /> : <AlertTriangle className="w-7 h-7 mr-3 text-yellow-400" />}
            {isMitigated ? 'Post-Mitigation Analysis' : 'Initial Bias Analysis'}
        </h3>
        <p className="text-gray-400 max-w-4xl">{data.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <MetricCard title="Demographic Parity Disparity" description={metricDescriptions.demographicParity}>
              <p className="text-gray-300">
                  Across <span className="font-semibold text-white">{selectedDemographic}</span> groups: <span className="text-2xl font-bold text-brand-primary">{demographicParityDisparity.toFixed(3)}</span>
              </p>
          </MetricCard>
          <MetricCard title="Equal Opportunity Disparity" description={metricDescriptions.equalOpportunity}>
              <p className="text-gray-300">
                   Across <span className="font-semibold text-white">{selectedDemographic}</span> groups: <span className="text-2xl font-bold text-brand-primary">{equalOpportunityDisparity.toFixed(3)}</span>
              </p>
          </MetricCard>
          <MetricCard title="Equalized Odds" description={metricDescriptions.equalizedOdds}>
            <p className="text-sm text-gray-400">Requires parity in both True Positive and False Positive rates. See charts for details.</p>
          </MetricCard>
      </div>

       <div>
        <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
                <h3 className="text-2xl font-bold text-white flex items-center">
                    <Users className="w-7 h-7 mr-3 text-brand-secondary" />
                    Demographic Group Comparison
                </h3>
                <div className="group relative ml-3">
                    <Info className="w-5 h-5 text-gray-500 cursor-pointer" />
                    <div className="absolute bottom-full mb-2 w-72 bg-gray-900 text-white text-xs rounded py-2 px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10 border border-gray-600 shadow-xl left-1/2 -translate-x-1/2">
                        <p className="font-bold text-gray-200 mb-1">What Is Demographic Group Comparison?</p>
                        <p>It’s the process of comparing how an AI model or dataset treats different groups of people, typically defined by attributes like:</p>
                        <ul className="list-disc list-inside mt-1 space-y-0.5 text-gray-300">
                            <li>Gender (e.g., male vs. female)</li>
                            <li>Race or ethnicity</li>
                            <li>Age</li>
                            <li>Disability status</li>
                            <li>Socioeconomic background</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div>
              <label htmlFor="demographic-select" className="sr-only">Select Demographic Comparison</label>
              <select
                id="demographic-select"
                value={selectedDemographic}
                onChange={(e) => setSelectedDemographic(e.target.value)}
                className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-brand-primary focus:border-brand-primary block w-full p-2.5"
                aria-label="Select demographic to compare"
              >
                {demographicCategories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BiasChart title="Approval Rate (Demographic Parity)" data={fairnessResults} dataKey="demographicParity" />
            <BiasChart title="Qualified Approval Rate (Equal Opportunity)" data={fairnessResults} dataKey="equalOpportunity" />
        </div>
      </div>
      
      <RecommendationBox />
    </div>
  );
};

export default Dashboard;