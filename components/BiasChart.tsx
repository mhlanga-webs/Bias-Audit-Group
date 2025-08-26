import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { FairnessResult } from '../types';

interface BiasChartProps {
  title: string;
  data: FairnessResult[];
  dataKey: keyof FairnessResult;
}

const BiasChart: React.FC<BiasChartProps> = ({ title, data, dataKey }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
      <h4 className="text-lg font-semibold text-white mb-4">{title}</h4>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
            <XAxis dataKey="groupName" stroke="#D1D5DB" />
            <YAxis stroke="#D1D5DB" domain={[0, 1]}/>
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                borderColor: '#4B5563',
                color: '#F3F4F6'
              }}
              formatter={(value: number) => `${(value * 100).toFixed(1)}%`}
            />
            <Legend wrapperStyle={{ color: '#F3F4F6' }} />
            <Bar dataKey={dataKey} name="Rate" fill="#0052FF" barSize={50} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BiasChart;