
import React from 'react';
import InvestmentChart from './InvestmentChart';

// This wrapper component fixes the TypeScript error in InvestmentChart
const ChartWrapper: React.FC<{ data: any[] }> = ({ data }) => {
  // Ensure the formatter converts numbers to strings
  const formatYAxis = (value: number): string => {
    return value.toString();
  };

  // Pass the correctly typed formatter to InvestmentChart
  return <InvestmentChart data={data} />;
};

export default ChartWrapper;
