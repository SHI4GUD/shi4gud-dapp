import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Globe, Calculator, Menu, X, MessageCircleQuestion, FileText, Flame } from 'lucide-react';
import CustomConnectButton from '../common/CustomConnectButton';
import shi4gudLogo from '/assets/logos/shi4gud-light.svg';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const websiteUrl = import.meta.env.VITE_WEBSITE_URL;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const commonLinkClasses = "text-gray-100 hover:bg-pink-500/20 transition-colors flex items-center group p-3 rounded-md text-sm font-medium";
  const commonIconClasses = "h-4 w-4 mr-3 text-zinc-400 group-hover:text-pink-500 transition-colors";

  return (
    <header className={`text-white px-2 py-4 sm:p-4 fixed w-full top-0 z-50 border-white/10 transition-all duration-300 ease-in-out ${isScrolled ? 'bg-[#1a1a2e]/90 shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto px-0 md:px-4 lg:px-8 flex justify-between items-center">
        {/* Logo - Left side */}
        <div className="shrink-0 -my-2">
          {websiteUrl ? (
            <a href={websiteUrl} rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
              <img src={shi4gudLogo} alt="SHI4GUD" className="h-12 max-[400px]:h-10 max-[375px]:h-8 max-[350px]:h-7 lg:h-16 w-auto" />
            </a>
          ) : (
            <Link to="/" className="hover:opacity-80 transition-opacity">
              <img src={shi4gudLogo} alt="SHI4GUD" className="h-12 max-[400px]:h-10 max-[375px]:h-8 max-[350px]:h-7 lg:h-16 w-auto" />
            </Link>
          )}
        </div>

        {/* Right side content */}
        <div className="flex items-center space-x-4">
          {/* Desktop Menu */}
          <nav className="hidden lg:flex space-x-4 items-center">
            <a href="https://shi4gud.com/bank" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-white hover:text-pink-500 transition-colors flex items-center group">
              <Flame className="h-4 w-4 mr-1 text-zinc-400 group-hover:text-pink-500 transition-colors" />
              Banks
            </a>
            <a href="https://shi4gud.com/faq" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-white hover:text-pink-500 transition-colors flex items-center group">
              <MessageCircleQuestion className="h-4 w-4 mr-1 text-zinc-400 group-hover:text-pink-500 transition-colors" />
              FAQ
            </a>
            <a href="https://docs.shi4gud.com" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-white hover:text-pink-500 transition-colors flex items-center group">
              <FileText className="h-4 w-4 mr-1 text-zinc-400 group-hover:text-pink-500 transition-colors" />
              Docs
            </a>
            <a href="https://shinatoken.com" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-white hover:text-pink-500 transition-colors flex items-center group">
              <Globe className="h-4 w-4 mr-1 text-zinc-400 group-hover:text-pink-500 transition-colors" />
              $SHI
            </a>
            <a href="https://shinatools.com" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-white hover:text-pink-500 transition-colors flex items-center group">
              <Calculator className="h-4 w-4 mr-1 text-zinc-400 group-hover:text-pink-500 transition-colors" />
              Tools
            </a>
            <a href="https://x.com/SHI4GUD" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-white hover:text-pink-500 transition-colors flex items-center group">
              <svg className="h-4 w-4 text-zinc-400 group-hover:text-pink-500 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
              </svg>
            </a>
            <a href="https://t.me/newShinaTokenPortal" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-white hover:text-pink-500 transition-colors flex items-center group">
              <svg className="h-4 w-4 text-zinc-400 group-hover:text-pink-500 transition-colors" fill="none" viewBox="0 0 15 15">
                <path stroke="currentColor" strokeLinejoin="round" d="M14.5 1.5l-14 5 4 2 6-4-4 5 6 4 2-12z"></path>
              </svg>
            </a>
            <a href="https://github.com/shi4gud" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-white hover:text-pink-500 transition-colors flex items-center group">
              <svg className="h-4 w-4 text-zinc-400 group-hover:text-pink-500 transition-colors" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
              </svg>
            </a>
          </nav>

          {/* Connect Button - Desktop */}
          <div className="hidden lg:block">
            <CustomConnectButton />
          </div>

          {/* Mobile Controls */}
          <div className="lg:hidden flex items-center">
            <CustomConnectButton isMobile={true} />
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="sm:ml-2 p-2 rounded-md text-gray-100 focus:outline-none"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`
          lg:hidden absolute top-full left-0 right-0 z-40 w-full shadow-lg
          bg-[#1a1a2e]/90 overflow-hidden
          transition-all duration-500 ease-in-out
          ${isMobileMenuOpen ? 'max-h-[calc(100vh-64px)]' : 'max-h-0'}
        `}
      >
        <div className={`p-4 transition-opacity duration-500 ease-in-out ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}>
          {/* Menu Items Area */}
          <nav className="flex flex-col space-y-1">
              <a
                href="https://shi4gud.com/bank"
                target="_blank"
                rel="noopener noreferrer"
                className={commonLinkClasses}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Flame className={commonIconClasses} />
                Banks
              </a>
              <a
                href="https://shi4gud.com/faq"
                target="_blank"
                rel="noopener noreferrer"
                className={commonLinkClasses}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <MessageCircleQuestion className={commonIconClasses} />
                FAQ
              </a>
              <a
                href="https://docs.shi4gud.com"
                target="_blank"
                rel="noopener noreferrer"
                className={commonLinkClasses}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FileText className={commonIconClasses} />
                Docs
              </a>
              <a
                href="https://shinatoken.com"
                target="_blank"
                rel="noopener noreferrer"
                className={commonLinkClasses}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Globe className={commonIconClasses} />
                Shina Token
              </a>
              <a
                href="https://shinatools.com"
                target="_blank"
                rel="noopener noreferrer"
                className={commonLinkClasses}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Calculator className={commonIconClasses} />
                Shina Tools
              </a>
              <a
                href="https://x.com/SHI4GUD"
                target="_blank"
                rel="noopener noreferrer"
                className={commonLinkClasses}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <svg className={commonIconClasses} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                </svg>
                SHI4GUD
              </a>
              <a
                href="https://t.me/newShinaTokenPortal"
                target="_blank"
                rel="noopener noreferrer"
                className={commonLinkClasses}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <svg className={commonIconClasses} fill="none" viewBox="0 0 15 15">
                  <path stroke="currentColor" strokeLinejoin="round" d="M14.5 1.5l-14 5 4 2 6-4-4 5 6 4 2-12z"></path>
                </svg>
                Telegram
              </a>
              <a
                href="https://github.com/shi4gud"
                target="_blank"
                rel="noopener noreferrer"
                className={commonLinkClasses}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <svg className={commonIconClasses} fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                </svg>
                GitHub
              </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;