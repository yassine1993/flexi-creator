
import React, { useState, useEffect } from "react";
import InvestmentSlider from "@/components/InvestmentSlider";
import InvestmentChart from "@/components/InvestmentChart";
import RiskProfileSelect from "@/components/RiskProfileSelect";
import ResultCard from "@/components/ResultCard";
import { 
  calculateInvestmentReturns, 
  generateChartData, 
  formatCurrency 
} from "@/utils/investmentCalculator";
import { motion } from "framer-motion";

const Index = () => {
  const [initialInvestment, setInitialInvestment] = useState(10000);
  const [monthlyContribution, setMonthlyContribution] = useState(100);
  const [years, setYears] = useState(10);
  const [riskProfile, setRiskProfile] = useState("neutral");
  const [results, setResults] = useState({
    expected: 0,
    good: 0,
    bad: 0
  });
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const calculatedResults = calculateInvestmentReturns(
      initialInvestment,
      monthlyContribution,
      years,
      riskProfile as any
    );
    
    setResults(calculatedResults);
    
    const data = generateChartData(
      initialInvestment,
      monthlyContribution,
      years,
      riskProfile as any
    );
    
    setChartData(data);
  }, [initialInvestment, monthlyContribution, years, riskProfile]);

  const riskProfileDescriptions = {
    conservative: "Prioritizing stability with balanced returns",
    neutral: "In balance, ready for all scenarios",
    aggressive: "Focused on maximizing long-term growth"
  };

  const containerAnimation = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemAnimation = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-calculator-mint/20 px-4 py-12 sm:px-6 lg:px-8">
      <motion.div 
        className="max-w-7xl mx-auto"
        initial="hidden"
        animate="show"
        variants={containerAnimation}
      >
        <motion.div variants={itemAnimation} className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-calculator-green mb-4">
            Calculate the possible returns
          </h1>
          <h2 className="text-2xl md:text-3xl font-medium text-calculator-green/80">
            from smart investing
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          <motion.div variants={itemAnimation} className="bg-white rounded-xl shadow-sm p-6 md:p-8">
            <InvestmentSlider
              label="What do you want to put in once?"
              min={0}
              max={500000}
              step={1000}
              value={initialInvestment}
              onChange={setInitialInvestment}
              formatValue={(value) => formatCurrency(value)}
              tooltip="This is the initial lump sum you'll invest at the start."
            />

            <InvestmentSlider
              label="What do you want to put in per month?"
              min={0}
              max={5000}
              step={50}
              value={monthlyContribution}
              onChange={setMonthlyContribution}
              formatValue={(value) => formatCurrency(value)}
              tooltip="This is the amount you'll contribute every month."
            />

            <InvestmentSlider
              label="For what period?"
              min={1}
              max={40}
              step={1}
              value={years}
              onChange={setYears}
              formatValue={(value) => `${value} years`}
              tooltip="The total time you plan to invest for."
            />

            <RiskProfileSelect
              value={riskProfile}
              onChange={(value) => setRiskProfile(value)}
            />
          </motion.div>

          <motion.div variants={itemAnimation} className="flex flex-col">
            <ResultCard
              title="Investment Projection"
              riskProfile={riskProfile}
              description={riskProfileDescriptions[riskProfile as keyof typeof riskProfileDescriptions]}
              expected={results.expected}
              good={results.good}
              bad={results.bad}
              years={years}
            />
            
            <div className="mt-6 bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-calculator-green mb-4">
                Projected Growth Over Time
              </h3>
              <InvestmentChart data={chartData} />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Index;
