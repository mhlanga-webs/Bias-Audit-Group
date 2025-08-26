
import React from 'react';
import { Info } from 'lucide-react';

interface MetricCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, description, children }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700 hover:border-brand-primary transition-colors duration-300 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-2">
            <h4 className="text-lg font-semibold text-white">{title}</h4>
            <div className="group relative">
                <Info className="w-5 h-5 text-gray-500 cursor-pointer" />
                <div className="absolute bottom-full mb-2 w-64 bg-gray-900 text-white text-xs rounded py-2 px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10 border border-gray-600 shadow-xl right-0">
                    {description}
                </div>
            </div>
        </div>
        <div className="mt-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MetricCard;
