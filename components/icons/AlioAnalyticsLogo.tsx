
import React from 'react';

export const AlioAnalyticsLogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 200 40" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <linearGradient id="alioGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style={{ stopColor: '#4A90A4', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#1B5956', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <text 
      x="0" y="30" 
      fontFamily="Poppins, sans-serif" 
      fontSize="30" 
      fontWeight="bold" 
      fill="url(#alioGradient)">
      alio
    </text>
    <text 
      x="68" y="30" 
      fontFamily="Poppins, sans-serif" 
      fontSize="30" 
      fontWeight="500" 
      fill="#2C2C2C">
      analytics
    </text>
  </svg>
);
