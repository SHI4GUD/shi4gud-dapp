import React from 'react';

type BankIconProps = {
	className?: string;
};

const BankIcon: React.FC<BankIconProps> = ({ className }) => (
	<svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        className={className}
        role="img"
        aria-labelledby="burnBankTitle"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
    >
        <title id="burnBankTitle">Burn Bank Icon</title>

        {/* Roof */}
        <polygon points="32,10 8,26 56,26" />

        {/* Columns */}
        <rect x="15" y="30.5" width="4" height="16" rx="2" ry="2" />
        <rect x="25" y="30.5" width="4" height="16" rx="2" ry="2" />
        <rect x="35" y="30.5" width="4" height="16" rx="2" ry="2" />
        <rect x="45" y="30.5" width="4" height="16" rx="2" ry="2" />

        {/* Base */}
        <rect x="8" y="51" width="48" height="4" rx="2" ry="2" />
    </svg>
);

export default BankIcon;