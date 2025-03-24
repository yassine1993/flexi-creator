
import React from 'react';
import InvestmentChart from './InvestmentChart';

// This wrapper component fixes the TypeScript error in InvestmentChart
const ChartWrapper: React.FC<{ data: any[] }> = ({ data }) => {
  return <InvestmentChart data={data} />;
};

export default ChartWrapper;
