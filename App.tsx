
import React, { useState, useMemo } from 'react';
import { biasedData, mitigatedData } from './data/mockData';
import type { ModelPerformanceData } from './types';
import Dashboard from './components/Dashboard';
import { BarChart, ShieldCheck, FileText, Users } from 'lucide-react';

const App: React.FC = () => {
  const [isMitigated, setIsMitigated] = useState(false);

  const activeData: ModelPerformanceData = useMemo(() => {
    return isMitigated ? mitigatedData : biasedData;
  }, [isMitigated]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <header className="bg-gray-800/50 backdrop-blur-sm shadow-lg sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center">
            <BarChart className="mr-3 h-7 w-7 text-brand-primary" />
            AI Bias Audit & Mitigation Toolkit
          </h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-300">Loan Approval Model Analysis</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="bg-gray-800 rounded-lg p-6 mb-8 shadow-2xl border border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h2 className="text-xl font-semibold text-white">Bias Mitigation Control</h2>
              <p className="text-gray-400 mt-1">
                Toggle to apply bias mitigation techniques and observe the impact on fairness metrics.
              </p>
            </div>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <span className={`font-medium ${!isMitigated ? 'text-brand-primary' : 'text-gray-500'}`}>
                Original Model
              </span>
              <label htmlFor="mitigation-toggle" className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  id="mitigation-toggle"
                  className="sr-only peer"
                  checked={isMitigated}
                  onChange={() => setIsMitigated(!isMitigated)}
                />
                <div className="w-14 h-8 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-brand-secondary"></div>
              </label>
              <span className={`font-medium ${isMitigated ? 'text-brand-secondary' : 'text-gray-500'}`}>
                Mitigated Model
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-3">
                 <Dashboard data={activeData} isMitigated={isMitigated} />
            </div>
        </div>

        <footer className="text-center mt-12 text-gray-500 text-sm">
            <p>Built by a world-class senior frontend React engineer. For demonstration purposes only.</p>
        </footer>
      </main>
    </div>
  );
};

export default App;
