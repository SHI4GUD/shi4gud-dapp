import React from 'react';
import shi4gudLogo from '/assets/logos/shi4gud-white.svg';
import Socials from '../common/Socials';
import { VERSION_INFO } from '../../utils/version';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const shortCommit = VERSION_INFO.commit.substring(0, 7);
  const githubUrl = 'https://github.com/SHI4GUD/shi4gud-dapp';
  
  return (
    <footer className="bg-zinc-900/50 text-gray-400 p-4 text-center mt-auto">
      <div className="w-full my-4">
        <Socials />
      </div>
      <p className="text-sm font-semibold mb-1">Disclaimer</p>
      <p className="text-[0.5rem] sm:text-[0.625rem] leading-relaxed mb-4 max-w-6xl mx-auto">
        Please do your own research and consult your financial and legal advisors before purchasing, staking or donating tokens. By staking tokens, you agree that the SHI4GUD team is not legally responsible or financially responsible for any losses or taxes incurred. The SHI4GUD team communicates no expectations of gains and no expectations of anything else. We do not recommend that you buy, sell, stake, or hold any cryptocurrency including Shina Inu or Shiba Inu. Placing your SHI or ETH or any other asset into this application could and may result in permanent loss of all your funds. The SHI4GUD team is not liable for any losses incurred for any reason including misuse or bugs in our code. We provide no guarantee that the application will work. We provide no way to recover funds if they are lost for any reason including a bug or error in our code. You use this application at your own risk. We provide no guarantee of returns in any application created by our team. By using any of these applications built by our team you acknowledge that you are using them at your own risk.
      </p>
      <img 
        src={shi4gudLogo} 
        alt="SHI4GUD Logo"
        width={160}
        height="auto"
        className="opacity-80 hover:opacity-100 transition-opacity mx-auto mb-3"
      />
      <p className="mb-3">&copy; {currentYear} SHI4GUD. All Rights Reserved.</p>
      
      {/* Open Source Section */}
      <div className="bg-linear-to-r from-[rgba(59,130,246,0.06)] to-[rgba(147,51,234,0.06)] px-2 sm:px-3 py-1.5 rounded border border-[rgba(59,130,246,0.15)] mb-2 max-w-sm mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[0.625rem] sm:text-xs">
          <div className="flex items-center gap-1.5">
            <svg className="w-3 h-3 text-blue-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            <span className="text-gray-300">Open Source</span>
          </div>
          <span className="text-gray-500">•</span>
          <div className="flex items-center gap-1.5">
            <svg className="w-3 h-3 text-blue-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-gray-300">GPG Signed</span>
          </div>
        </div>
      </div>

      {/* Build Verification Section */}
      <div className="bg-linear-to-r from-[rgba(255,107,107,0.06)] to-[rgba(255,142,83,0.06)] px-2 sm:px-3 py-1.5 rounded border border-[rgba(255,107,107,0.15)] max-w-sm mx-auto mb-3">
        <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[0.625rem] sm:text-xs">
          <a 
            href={`${githubUrl}/commit/${VERSION_INFO.commit}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-orange-400 transition-colors inline-flex items-center gap-1"
          >
            <span className="text-gray-400">Build:</span>
            <span className="font-mono text-orange-500">{shortCommit}</span>
            <svg className="w-3 h-3 text-green-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </a>
          <span className="text-gray-500">•</span>
          <a 
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-orange-400 transition-colors"
          >
            GitHub
          </a>
          <span className="text-gray-500">•</span>
          <a 
            href="/verify"
            className="hover:text-orange-400 transition-colors"
          >
            Verify Build
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;