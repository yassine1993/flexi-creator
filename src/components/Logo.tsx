
import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = '', showText = true }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src="/lovable-uploads/03d63e44-12e1-46c7-a335-dccb175a40be.png" 
        alt="Animo Logo" 
        className="h-10 w-auto"
      />
    </div>
  );
};

export default Logo;
