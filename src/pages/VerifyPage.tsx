import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { VERSION_INFO } from '../utils/version';

const VerifyPage: React.FC = () => {
  const GITHUB_URL = 'https://github.com/shi4gud/shi4gud-dapp';
  const REPO_NAME = 'shi4gud-dapp';

  return (
    <div style={{ paddingTop: '80px' }} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-400 transition-colors mb-8 group"
      >
        <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
        <span className="font-semibold">Return to App</span>
      </Link>

      <h1 className="font-bold text-3xl md:text-4xl mb-8 pb-2 leading-relaxed text-center">
        <span className="bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
          Verify This Build
        </span>
      </h1>
      
      <div className="space-y-4 sm:space-y-6">
        {/* Current Deployment Section */}
        <div className="bg-gradient-to-r from-[rgba(255,107,107,0.06)] to-[rgba(255,142,83,0.06)] p-4 sm:p-6 rounded-xl border border-[rgba(255,107,107,0.15)]">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-white">
            Current Deployment
          </h2>
          <div className="space-y-2">
            <p className="text-sm sm:text-base text-gray-300 break-words">
              <span className="text-gray-400">Commit:</span>{' '}
              <a
                href={`${GITHUB_URL}/commit/${VERSION_INFO.commit}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs sm:text-sm text-orange-500 hover:text-orange-400 underline break-all"
              >
                {VERSION_INFO.commit}
              </a>
            </p>
            <p className="text-sm sm:text-base text-gray-300">
              <span className="text-gray-400">Build Time:</span>{' '}
              <span className="font-mono text-xs sm:text-sm break-words">
                {new Date(VERSION_INFO.buildTime).toLocaleString()}
              </span>
            </p>
          </div>
        </div>

        {/* How to Verify Section */}
        <div className="bg-gradient-to-r from-[rgba(255,107,107,0.06)] to-[rgba(255,142,83,0.06)] p-4 sm:p-6 rounded-xl border border-[rgba(255,107,107,0.15)]">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-white">
            How to Verify
          </h2>
          <ol className="list-decimal list-inside space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-300">
            <li>Clone the repository from GitHub</li>
            <li>Checkout the specific commit shown above</li>
            <li>Install dependencies and build the project</li>
            <li>Compare your local build output with the deployed version</li>
          </ol>
        </div>

        {/* Verification Commands Section */}
        <div className="bg-gradient-to-r from-[rgba(255,107,107,0.08)] to-[rgba(255,142,83,0.08)] p-4 sm:p-6 rounded-xl border border-[rgba(255,107,107,0.2)]">
          <h3 className="text-base sm:text-lg font-semibold mb-3 text-white">
            Verification Commands
          </h3>
          <div className="font-mono text-xs sm:text-sm text-gray-300 space-y-1 overflow-x-auto">
            <div className="text-gray-500"># Clone the repository</div>
            <div className="whitespace-nowrap">git clone {GITHUB_URL}</div>
            <div className="whitespace-nowrap">cd {REPO_NAME}</div>
            <div className="mt-3 text-gray-500"># Checkout this exact commit</div>
            <div className="whitespace-nowrap">git checkout {VERSION_INFO.commit}</div>
            <div className="mt-3 text-gray-500"># Install dependencies and build</div>
            <div className="whitespace-nowrap">npm ci</div>
            <div className="whitespace-nowrap">npm run build</div>
            <div className="mt-3 text-gray-500"># The output will be in the dist/ folder</div>
          </div>
        </div>

        {/* What to Compare Section */}
        <div className="bg-gradient-to-r from-[rgba(255,107,107,0.06)] to-[rgba(255,142,83,0.06)] p-4 sm:p-6 rounded-xl border border-[rgba(255,107,107,0.15)]">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-white">
            What to Compare
          </h2>
          <p className="text-sm sm:text-base text-gray-300 mb-4">
            After building locally, you can compare your build with the deployed version by:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-gray-300">
            <li>Checking that the JavaScript bundle contents match</li>
            <li>Verifying the HTML structure is identical</li>
            <li>Comparing asset hashes and file sizes</li>
          </ul>
          <p className="text-gray-400 text-xs sm:text-sm mt-4">
            Note: Some build timestamps may differ, but the core code should be identical.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <a
            href={`${GITHUB_URL}/commit/${VERSION_INFO.commit}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-center bg-gradient-to-r from-pink-500 to-orange-500 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg hover:from-pink-600 hover:to-orange-600 transition-all font-semibold text-sm sm:text-base shadow-lg"
          >
            View This Commit on GitHub
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-center bg-gradient-to-r from-[rgba(255,107,107,0.15)] to-[rgba(255,142,83,0.15)] border border-[rgba(255,107,107,0.3)] text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg hover:from-[rgba(255,107,107,0.25)] hover:to-[rgba(255,142,83,0.25)] transition-all font-semibold text-sm sm:text-base"
          >
            View Repository
          </a>
        </div>
      </div>
    </div>
  );
};

export default VerifyPage;