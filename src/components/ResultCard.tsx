
import React from 'react';
import { formatCurrency } from '@/utils/investmentCalculator';

interface ResultCardProps {
  title: string;
  riskProfile: string;
  description: string;
  expected: number;
  good: number;
  bad: number;
  years: number;
}

const ResultCard: React.FC<ResultCardProps> = ({
  title,
  riskProfile,
  description,
  expected,
  good,
  bad,
  years,
}) => {
  return (
    <div className="bg-calculator-mint/30 rounded-xl overflow-hidden shadow-glass p-6 animate-fade-in">
      <div className="mb-6">
        <div className="text-sm uppercase tracking-wide text-calculator-green font-semibold">Risk profile</div>
        <h3 className="text-4xl font-bold text-calculator-green mt-1 mb-2 capitalize">{riskProfile}</h3>
        <p className="text-calculator-green/90">{description}</p>
      </div>

      <div className="border-t border-calculator-mint my-6"></div>
      
      <div>
        <div className="flex justify-between items-center mb-10">
          <div className="text-left">
            <div className="text-calculator-good font-semibold">Good</div>
            <div className="text-2xl font-bold">{formatCurrency(good)}</div>
          </div>
          <div className="text-center">
            <div className="text-calculator-neutral font-semibold">Expect</div>
            <div className="text-2xl font-bold">{formatCurrency(expected)}</div>
          </div>
          <div className="text-right">
            <div className="text-calculator-bad font-semibold">Bad</div>
            <div className="text-2xl font-bold">{formatCurrency(bad)}</div>
          </div>
        </div>
        
        <div className="mt-6 flex justify-center">
          <div className="text-center mb-6">
            <h3 className="text-5xl font-bold text-calculator-green">{formatCurrency(expected)}</h3>
            <p className="text-calculator-green/90 mt-2">
              Expect result after <span className="font-bold">{years} years</span>
            </p>
          </div>
        </div>
        
        <div className="flex justify-between mt-8">
          <div className="bg-white/80 p-4 rounded-lg flex-1 mx-1 text-center hover-lift">
            <div className="font-semibold text-sm text-gray-600">Worse than expected</div>
            <div className="font-bold text-calculator-bad text-xl mt-2">{formatCurrency(bad)}</div>
          </div>
          <div className="bg-white/80 p-4 rounded-lg flex-1 mx-1 text-center hover-lift">
            <div className="font-semibold text-sm text-gray-600">Expect scenario</div>
            <div className="font-bold text-calculator-neutral text-xl mt-2">{formatCurrency(expected)}</div>
          </div>
          <div className="bg-white/80 p-4 rounded-lg flex-1 mx-1 text-center hover-lift">
            <div className="font-semibold text-sm text-gray-600">Better than expected</div>
            <div className="font-bold text-calculator-good text-xl mt-2">{formatCurrency(good)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
