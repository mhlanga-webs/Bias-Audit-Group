
import React, { useState, useCallback } from 'react';
import { generateEthicsFramework, generateDatasetImprovements } from '../services/geminiService';
import { FileText, DatabaseZap, BrainCircuit } from 'lucide-react';
import LoadingSpinner from './common/LoadingSpinner';

const RecommendationBox: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [content, setContent] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'framework' | 'improvements' | null>(null);

  const handleGenerate = useCallback(async (type: 'framework' | 'improvements') => {
    setIsLoading(true);
    setError(null);
    setContent(null);
    setActiveTab(type);

    try {
      let responseText;
      if (type === 'framework') {
        responseText = await generateEthicsFramework();
      } else {
        responseText = await generateDatasetImprovements();
      }
      setContent(responseText);
    } catch (err) {
      setError('Failed to generate content. Please ensure your API key is configured correctly.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  const parseAndRenderContent = (text: string) => {
    // A simple parser for markdown-like text from Gemini
    return text.split('\n').map((line, index) => {
      if (line.startsWith('### ')) {
        return <h4 key={index} className="text-md font-semibold text-brand-secondary mt-4 mb-1">{line.substring(4)}</h4>;
      }
      if (line.startsWith('**') && line.endsWith('**')) {
        return <p key={index} className="font-bold text-gray-200 mt-2">{line.substring(2, line.length - 2)}</p>;
      }
      if (line.startsWith('* ')) {
        return <li key={index} className="ml-5 list-disc text-gray-400">{line.substring(2)}</li>;
      }
      return <p key={index} className="text-gray-400 my-1">{line}</p>;
    });
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700 mt-8">
      <h3 className="text-2xl font-bold text-white flex items-center mb-4">
        <BrainCircuit className="w-7 h-7 mr-3 text-brand-primary" />
        Generative AI Insights & Recommendations
      </h3>
      <p className="text-gray-400 mb-6">Use AI to generate an ethics framework for this use case or get recommendations for improving your dataset.</p>

      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => handleGenerate('framework')}
          disabled={isLoading}
          className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-brand-primary hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-brand-primary disabled:bg-gray-600 transition-colors"
        >
          <FileText className="w-5 h-5 mr-2" />
          Generate Ethics Framework
        </button>
        <button
          onClick={() => handleGenerate('improvements')}
          disabled={isLoading}
          className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-brand-secondary hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-brand-secondary disabled:bg-gray-600 transition-colors"
        >
          <DatabaseZap className="w-5 h-5 mr-2" />
          Suggest Dataset Improvements
        </button>
      </div>

      <div className="mt-4 p-4 bg-gray-900/50 rounded-md min-h-[200px] border border-gray-700">
        {isLoading && <div className="flex justify-center items-center h-full"><LoadingSpinner /></div>}
        {error && <div className="text-red-400 text-center">{error}</div>}
        {content && (
            <div>
                 <h3 className="text-lg font-semibold text-white mb-3">
                    {activeTab === 'framework' ? 'Generated Ethics Framework' : 'Dataset Improvement Suggestions'}
                 </h3>
                <div className="prose prose-invert prose-sm max-w-none">
                    {parseAndRenderContent(content)}
                </div>
            </div>
        )}
        {!isLoading && !error && !content && <div className="text-gray-500 text-center flex justify-center items-center h-full">Click a button to generate insights.</div>}
      </div>
    </div>
  );
};

export default RecommendationBox;
