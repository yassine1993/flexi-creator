
type RiskProfile = 'conservative' | 'neutral' | 'aggressive';

interface ScenarioResult {
  expected: number;
  good: number;
  bad: number;
}

export interface ChartDataPoint {
  year: number;
  expected: number;
  good: number;
  bad: number;
}

const ANNUAL_RETURNS: Record<RiskProfile, { expected: number; good: number; bad: number }> = {
  conservative: { expected: 0.04, good: 0.06, bad: 0.02 },
  neutral: { expected: 0.06, good: 0.09, bad: 0.03 },
  aggressive: { expected: 0.08, good: 0.12, bad: 0.03 }
};

export function calculateInvestmentReturns(
  initialInvestment: number,
  monthlyContribution: number,
  years: number,
  riskProfile: RiskProfile = 'neutral'
): ScenarioResult {
  const monthlyRate = {
    expected: ANNUAL_RETURNS[riskProfile].expected / 12,
    good: ANNUAL_RETURNS[riskProfile].good / 12,
    bad: ANNUAL_RETURNS[riskProfile].bad / 12
  };

  const months = years * 12;
  
  const calculateScenario = (rate: number): number => {
    let balance = initialInvestment;
    
    for (let i = 0; i < months; i++) {
      balance = balance * (1 + rate) + monthlyContribution;
    }
    
    return Math.round(balance);
  };

  return {
    expected: calculateScenario(monthlyRate.expected),
    good: calculateScenario(monthlyRate.good),
    bad: calculateScenario(monthlyRate.bad)
  };
}

export function generateChartData(
  initialInvestment: number,
  monthlyContribution: number,
  years: number,
  riskProfile: RiskProfile = 'neutral'
): ChartDataPoint[] {
  const monthlyRate = {
    expected: ANNUAL_RETURNS[riskProfile].expected / 12,
    good: ANNUAL_RETURNS[riskProfile].good / 12,
    bad: ANNUAL_RETURNS[riskProfile].bad / 12
  };

  const data: ChartDataPoint[] = [];
  const currentYear = new Date().getFullYear();
  
  let balanceExpected = initialInvestment;
  let balanceGood = initialInvestment;
  let balanceBad = initialInvestment;

  // Generate data points for each year
  for (let year = 0; year <= years; year++) {
    // Add data point for current year
    data.push({
      year: currentYear + year,
      expected: Math.round(balanceExpected),
      good: Math.round(balanceGood),
      bad: Math.round(balanceBad)
    });
    
    // Calculate next 12 months
    if (year < years) {
      for (let month = 0; month < 12; month++) {
        balanceExpected = balanceExpected * (1 + monthlyRate.expected) + monthlyContribution;
        balanceGood = balanceGood * (1 + monthlyRate.good) + monthlyContribution;
        balanceBad = balanceBad * (1 + monthlyRate.bad) + monthlyContribution;
      }
    }
  }
  
  return data;
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0
  }).format(value);
}
