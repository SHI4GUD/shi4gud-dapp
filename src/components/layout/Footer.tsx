import React from 'react';
import shi4gudLogo from '/assets/logos/shi4gud-white.svg';
import Socials from '../common/Socials';
import { VERSION_INFO } from '../../utils/version';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const shortCommit = VERSION_INFO.commit.substring(0, 7);
  const githubUrl = 'https://github.com/shi4gud/shi4gud-dapp';
  
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
        className="opacity-80 hover:opacity-100 transition-opacity mx-auto mb-2"
      />
      <p className="mb-2">&copy; {currentYear} SHI4GUD. All Rights Reserved.</p>
      <p className="text-xs text-gray-500">
        <a 
          href={`${githubUrl}/commit/${VERSION_INFO.commit}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-300 hover:underline transition-colors"
        >
          Build: {shortCommit}
        </a>
        {' • '}
        <a 
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-300 hover:underline transition-colors"
        >
          GitHub
        </a>
        {' • '}
        <a 
          href="/verify"
          className="hover:text-gray-300 hover:underline transition-colors"
        >
          Verify Build
        </a>
      </p>
    </footer>
  );
};

export default Footer;