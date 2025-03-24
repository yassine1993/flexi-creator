
import React from 'react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Info } from "lucide-react";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface RiskProfileSelectProps {
  value: string;
  onChange: (value: string) => void;
}

const riskProfiles = [
  {
    value: "conservative",
    label: "Conservative: Low risk, stable returns",
    description: "Lower risk with more predictable but potentially lower returns. Suitable for short-term goals or those close to retirement."
  },
  {
    value: "neutral",
    label: "Neutral: Balanced for all scenarios",
    description: "A balanced approach with moderate risk and moderate growth potential. Suitable for medium-term goals."
  },
  {
    value: "aggressive",
    label: "Aggressive: Higher growth potential",
    description: "Higher risk with potentially higher returns. Most suitable for long-term goals when you can ride out market fluctuations."
  }
];

const RiskProfileSelect: React.FC<RiskProfileSelectProps> = ({ value, onChange }) => {
  return (
    <div className="mb-8 animate-slide-in">
      <div className="flex items-center mb-4">
        <label className="text-calculator-green font-medium mr-2">
          Which risk profile suits you?
        </label>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger type="button">
              <Info className="h-5 w-5 text-gray-400" />
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <p>Your risk profile determines the balance between potential returns and market volatility.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full border-calculator-mint focus:ring-calculator-neutral">
          <SelectValue placeholder="Select a risk profile" />
        </SelectTrigger>
        <SelectContent>
          {riskProfiles.map((profile) => (
            <SelectItem key={profile.value} value={profile.value}>
              <div className="py-1">
                <div className="font-medium">{profile.label}</div>
                <div className="text-sm text-gray-500 mt-1">{profile.description}</div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default RiskProfileSelect;
