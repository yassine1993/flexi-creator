
import React, { useState, useEffect } from 'react';
import { Slider } from "@/components/ui/slider";
import { Info } from "lucide-react";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface InvestmentSliderProps {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
  formatValue: (value: number) => string;
  tooltip?: string;
  showValue?: boolean;
}

const InvestmentSlider: React.FC<InvestmentSliderProps> = ({
  label,
  min,
  max,
  step,
  value,
  onChange,
  formatValue,
  tooltip,
  showValue = true
}) => {
  const [sliderValue, setSliderValue] = useState(value);

  useEffect(() => {
    setSliderValue(value);
  }, [value]);

  const handleSliderChange = (newValue: number[]) => {
    setSliderValue(newValue[0]);
    onChange(newValue[0]);
  };

  const progress = ((sliderValue - min) / (max - min)) * 100;

  return (
    <div className="mb-8 animate-slide-in">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <label className="text-calculator-green font-medium mr-2">
            {label}
          </label>
          {tooltip && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger type="button">
                  <Info className="h-5 w-5 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>{tooltip}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        {showValue && (
          <div className="py-1 px-3 bg-calculator-green text-white font-medium rounded-md">
            {formatValue(sliderValue)}
          </div>
        )}
      </div>
      <div 
        className="w-full relative" 
        style={{ '--progress': `${progress}%` } as React.CSSProperties}
      >
        <Slider
          min={min}
          max={max}
          step={step}
          value={[sliderValue]}
          onValueChange={handleSliderChange}
          className="custom-slider"
        />
      </div>
    </div>
  );
};

export default InvestmentSlider;
