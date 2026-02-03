import React from 'react';

const Socials: React.FC = () => {
    return (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <div className="inline-flex flex-wrap justify-center flex-row gap-3">
                <a href="https://x.com/SHI4GUD" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-transparent transition-all text-pink-500 hover:text-pink-600 border-2 border-pink-500 hover:border-pink-600">
                    <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                    </svg>
                    <span className="font-semibold whitespace-nowrap">SHI4GUD</span>
                </a>
                <a href="https://github.com/shi4gud" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-transparent transition-all text-pink-500 hover:text-pink-600 border-2 border-pink-500 hover:border-pink-600">
                    <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                    </svg>
                    <span className="font-semibold whitespace-nowrap">GitHub</span>
                </a>
                <a href="https://x.com/ShinaToken" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-transparent transition-all text-pink-500 hover:text-pink-600 border-2 border-pink-500 hover:border-pink-600">
                    <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                    </svg>
                    <span className="font-semibold whitespace-nowrap">Shina Token</span>
                </a>
                <a href="https://t.me/newShinaTokenPortal" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-transparent transition-all text-pink-500 hover:text-pink-600 border-2 border-pink-500 hover:border-pink-600">
                    <svg fill="none" viewBox="0 0 15 15" className="w-5 h-5 shrink-0">
                        <path stroke="currentColor" strokeLinejoin="round" d="M14.5 1.5l-14 5 4 2 6-4-4 5 6 4 2-12z"></path>
                    </svg>
                    <span className="font-semibold whitespace-nowrap">Telegram</span>
                </a>
            </div>
        </div>
    );
};

export default Socials; 