
import React from 'react';

export const SerBancarioLogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 450 60" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g>
        <rect x="5" y="5" width="50" height="50" fill="none" stroke="#1B5956" strokeWidth="2"/>
        <rect x="8" y="8" width="44" height="44" fill="none" stroke="#1B5956" strokeWidth="1"/>
        <text 
            x="30" y="44" 
            fontFamily="Playfair Display, serif" 
            fontSize="38" 
            fill="#D4AF37" 
            textAnchor="middle" 
            fontWeight="bold">
            $
        </text>
    </g>
    <text 
        x="75" y="28" 
        fontFamily="Poppins, sans-serif" 
        fontSize="24" 
        fill="#2C2C2C" 
        fontWeight="600"
        letterSpacing="1">
        SER
    </text>
    <text 
        x="75" y="52" 
        fontFamily="Poppins, sans-serif" 
        fontSize="24" 
        fill="#2C2C2C" 
        fontWeight="bold"
        letterSpacing="1">
        BANCÁRIO
    </text>
  </svg>
);
