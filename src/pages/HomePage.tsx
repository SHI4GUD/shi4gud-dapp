import React, { useState } from 'react';
import Ktv2Dashboard from '../components/features/ktv2/Ktv2Dashboard';
import BankIcon from '../components/common/BankIcon';

const HomePage: React.FC = () => {
  const [currentTokenSymbol, setCurrentTokenSymbol] = useState<string | null>('Shina');

  const handleSymbolLoaded = (symbol: string | null) => {
    setCurrentTokenSymbol(symbol);
  };

  return (
    <div style={{paddingTop: '80px'}} className="p-4 px-0 md:px-4 max-w-6xl mx-auto relative">
      <div className="flex justify-center items-center gap-2 mb-10">
        <BankIcon className="text-pink-500 md:w-16 md:h-16 w-12 h-12" />
        <h1 className="bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent font-bold text-3xl md:text-4xl">{currentTokenSymbol || ''} Burn Bank</h1>
      </div>

      <Ktv2Dashboard onSymbolLoaded={handleSymbolLoaded} />
    </div>
  );
};

export default HomePage;