
import React, { useState, useEffect } from 'react';
import { ChartDataPoint } from '@/utils/investmentCalculator';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer 
} from 'recharts';

interface InvestmentChartProps {
  data: ChartDataPoint[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 shadow-lg rounded-md border border-gray-100">
        <p className="font-medium text-gray-800">{`Year: ${label}`}</p>
        <p className="text-calculator-good">
          {`Better than expected: €${payload[2].value.toLocaleString()}`}
        </p>
        <p className="text-calculator-neutral">
          {`Expected: €${payload[1].value.toLocaleString()}`}
        </p>
        <p className="text-calculator-bad">
          {`Worse than expected: €${payload[0].value.toLocaleString()}`}
        </p>
      </div>
    );
  }

  return null;
};

const InvestmentChart: React.FC<InvestmentChartProps> = ({ data }) => {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 2000);
    return () => clearTimeout(timer);
  }, [data]);

  // Format tick values to be more readable (K for thousands, M for millions)
  const formatYAxis = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}K`;
    }
    return value;
  };

  return (
    <div className="w-full h-[300px] chart-container">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorGood" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#116559" stopOpacity={0.7} />
              <stop offset="95%" stopColor="#116559" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="colorExpected" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#19776e" stopOpacity={0.7} />
              <stop offset="95%" stopColor="#19776e" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="colorBad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#e27d60" stopOpacity={0.5} />
              <stop offset="95%" stopColor="#e27d60" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis 
            dataKey="year" 
            minTickGap={30}
            tick={{ fill: '#555', fontSize: 12 }} 
          />
          <YAxis 
            tickFormatter={formatYAxis} 
            tick={{ fill: '#555', fontSize: 12 }}
          />
          <RechartsTooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="bad"
            stroke="#e27d60"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorBad)"
            strokeDasharray={isAnimating ? "1000 1000" : "0"}
            className={isAnimating ? "animate-chart-line" : ""}
          />
          <Area
            type="monotone"
            dataKey="expected"
            stroke="#19776e"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorExpected)"
            strokeDasharray={isAnimating ? "1000 1000" : "0"}
            className={isAnimating ? "animate-chart-line" : ""}
          />
          <Area
            type="monotone"
            dataKey="good"
            stroke="#116559"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorGood)"
            strokeDasharray={isAnimating ? "1000 1000" : "0"}
            className={isAnimating ? "animate-chart-line" : ""}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default InvestmentChart;
