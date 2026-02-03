import React from 'react';
import { Heart, ExternalLink, Shield, Wallet, Users } from 'lucide-react';

const GudFundSection: React.FC = () => {
  const ENDAOMENT_URL = 'https://app.endaoment.org/gud';
  const ENDAOMENT_LOGO = '/assets/charity/endaoment-logo.svg';

  return (
    <div id="gud-fund" className="mt-16 mb-8">
      {/* Section Header */}
      <div className="flex justify-center items-center gap-2 mb-10">
        <Heart className="text-pink-500 md:w-16 md:h-16 w-12 h-12" />
        <h2 className="bg-linear-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent font-bold text-3xl md:text-4xl">
          Gud Fund
        </h2>
      </div>

      {/* Main Content Card */}
      <div className="bg-linear-to-r from-[rgba(255,107,107,0.06)] to-[rgba(255,142,83,0.06)] p-4 sm:p-6 md:p-8 rounded-xl border border-[rgba(255,107,107,0.15)]">
        {/* Mission */}
        <div className="text-center mb-5 sm:mb-6">
          <p className="text-base sm:text-lg md:text-xl text-gray-100 font-semibold mb-2 leading-snug">
            From Memes to Meaning
          </p>
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
            Participation supports the Gud Fund, a Transparent Fund on Endaoment.
          </p>
        </div>

        {/* Powered by Endaoment */}
        <div className="bg-[rgba(255,255,255,0.03)] rounded-lg p-4 sm:p-5 md:p-6 md:px-10 lg:px-16 mb-5 sm:mb-6">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-5">
            <span className="text-xs sm:text-sm text-gray-400 font-medium">Powered by</span>
            <a 
              href="https://endaoment.org"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded px-2.5 py-1 sm:px-3 sm:py-1.5 hover:bg-gray-100 transition-colors"
            >
              <img 
                src={ENDAOMENT_LOGO}
                alt="Endaoment"
                className="h-5 sm:h-6 md:h-7 w-auto"
                onError={(e) => {
                  // Fallback if logo doesn't load
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
            </a>
            <span className="text-lg font-bold text-white hidden">Endaoment</span>
          </div>
          
          <p className="text-xs sm:text-sm md:text-base text-gray-300 leading-relaxed mb-4 sm:mb-5 text-center">
            Endaoment is a 501(c)(3) nonprofit organization that enables transparent, on-chain charitable giving. 
            By hosting our fund on Endaoment, we ensure complete transparency and accountability.
          </p>
          
          {/* Features Grid */}
          <div className="flex flex-col sm:grid sm:grid-cols-3 gap-3 sm:gap-4 items-center sm:items-stretch">
            <div className="flex flex-col items-center">
              <p className="text-xs sm:text-sm font-semibold text-gray-100 mb-1 flex items-center justify-center gap-2">
                <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400 shrink-0" />
                100% Transparent
              </p>
              <p className="text-xs text-gray-400 leading-relaxed text-center">All transactions on-chain</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-xs sm:text-sm font-semibold text-gray-100 mb-1 flex items-center justify-center gap-2">
                <Wallet className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400 shrink-0" />
                Crypto-Native
              </p>
              <p className="text-xs text-gray-400 leading-relaxed text-center">Donate directly with crypto</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-xs sm:text-sm font-semibold text-gray-100 mb-1 flex items-center justify-center gap-2">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400 shrink-0" />
                Community-Driven
              </p>
              <p className="text-xs text-gray-400 leading-relaxed text-center">Advised by SHI4GUD</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-xs sm:text-sm text-gray-400 mb-3 sm:mb-4 leading-relaxed">
            Click below to view balance and transaction history
          </p>
          <a
            href={ENDAOMENT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center flex-wrap gap-2 bg-linear-to-r from-pink-500 to-orange-500 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg hover:from-pink-600 hover:to-orange-600 transition-all font-semibold shadow-lg text-sm sm:text-base md:text-lg"
          >
            <span>Visit the Gud Fund on Endaoment</span>
            <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default GudFundSection;