import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { VERSION_INFO } from '../utils/version';

const VerifyPage: React.FC = () => {
  const GITHUB_URL = 'https://github.com/SHI4GUD/shi4gud-dapp';
  const REPO_NAME = 'shi4gud-dapp';
  const CLOUDFLARE_PAGES_URL = 'https://app.shi4gud.com';
  const commitUrl = `${GITHUB_URL}/commit/${VERSION_INFO.commit}`;

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
                href={commitUrl}
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

        {/* Cloudflare Pages Deployment Section */}
        <div className="bg-gradient-to-r from-[rgba(255,107,107,0.06)] to-[rgba(255,142,83,0.06)] p-4 sm:p-6 rounded-xl border border-[rgba(255,107,107,0.15)]">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-white flex items-center gap-2">
            <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
            </svg>
            Cloudflare Pages Deployment
          </h2>
          <div className="space-y-4">
            <div className="bg-[rgba(0,0,0,0.2)] p-3 sm:p-4 rounded-lg">
              <p className="text-sm sm:text-base text-gray-300 mb-3">
                <span className="text-gray-100 font-semibold">Deployment URL:</span>
                <br />
                <a
                  href={CLOUDFLARE_PAGES_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs sm:text-sm text-orange-500 hover:text-orange-400 underline break-all inline-block mt-1"
                >
                  {CLOUDFLARE_PAGES_URL}
                </a>
              </p>
              <p className="text-xs sm:text-sm text-gray-400 mb-3">
                This application is automatically deployed to Cloudflare Pages on every commit to the main branch. 
                The deployment is live and accessible at the URL above.
              </p>
              
              <div className="mt-4 pt-4 border-t border-[rgba(255,255,255,0.1)]">
                <p className="text-xs sm:text-sm text-gray-300 mb-2">
                  <span className="text-gray-100 font-semibold">Custom Domain Connection:</span>
                </p>
                <p className="text-xs sm:text-sm text-gray-400 mb-3">
                  Cloudflare Pages automatically generates a <code className="text-orange-400 bg-[rgba(0,0,0,0.3)] px-1.5 py-0.5 rounded">*.pages.dev</code> URL for each deployment. 
                  The custom domain <code className="text-orange-400 bg-[rgba(0,0,0,0.3)] px-1.5 py-0.5 rounded">app.shi4gud.com</code> is connected to this Cloudflare Pages deployment 
                  through DNS configuration and SSL certificates managed by Cloudflare.
                </p>
                <div className="bg-[rgba(59,130,246,0.1)] p-3 rounded-lg border border-[rgba(59,130,246,0.2)] mt-3">
                  <p className="text-xs sm:text-sm text-gray-300 mb-2">
                    <span className="text-blue-400 font-semibold">How to verify the connection:</span>
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-gray-400 ml-2">
                    <li><strong className="text-gray-300">DNS Records:</strong> The domain points to Cloudflare Pages via CNAME or A records</li>
                    <li><strong className="text-gray-300">SSL Certificate:</strong> Cloudflare automatically provisions and manages SSL certificates (HTTPS)</li>
                    <li><strong className="text-gray-300">Both URLs serve the same content:</strong> You can verify by comparing the content at both the <code className="text-orange-400 bg-[rgba(0,0,0,0.3)] px-1 py-0.5 rounded text-xs">*.pages.dev</code> URL and <code className="text-orange-400 bg-[rgba(0,0,0,0.3)] px-1 py-0.5 rounded text-xs">app.shi4gud.com</code></li>
                    <li><strong className="text-gray-300">Check DNS:</strong> Use <code className="text-orange-400 bg-[rgba(0,0,0,0.3)] px-1 py-0.5 rounded text-xs">nslookup app.shi4gud.com</code> or <code className="text-orange-400 bg-[rgba(0,0,0,0.3)] px-1 py-0.5 rounded text-xs">dig app.shi4gud.com</code> to verify DNS resolution</li>
                    <li><strong className="text-gray-300">SSL Verification:</strong> The padlock icon in your browser confirms a valid SSL certificate issued by Cloudflare</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center mt-0.5">
                  <svg className="w-3 h-3 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm sm:text-base text-gray-300">
                    <span className="text-gray-100 font-semibold">GitHub Status Checkmark</span>
                    <br />
                    <span className="text-xs sm:text-sm text-gray-400">
                      Cloudflare Pages automatically creates a status check for each deployment. On the GitHub commit page, 
                      you'll see a green checkmark (✓) next to "Cloudflare Pages" indicating successful deployment. 
                      This checkmark appears in the commit status section, typically below the commit message.
                    </span>
                  </p>
                </div>
              </div>
              
              <div className="bg-[rgba(59,130,246,0.1)] p-3 rounded-lg border border-[rgba(59,130,246,0.2)]">
                <p className="text-xs sm:text-sm text-gray-300 mb-2">
                  <span className="text-blue-400 font-semibold">How to find the checkmark:</span>
                </p>
                <ol className="list-decimal list-inside space-y-1 text-xs sm:text-sm text-gray-400 ml-2">
                  <li>Visit the commit page on GitHub (link provided above)</li>
                  <li>Scroll down to the "Checks" or "Status" section</li>
                  <li>Look for "Cloudflare Pages" with a green checkmark (✓)</li>
                  <li>Click on it to view deployment details and logs</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        {/* Transparency Features */}
        <div className="bg-gradient-to-r from-[rgba(59,130,246,0.06)] to-[rgba(147,51,234,0.06)] p-4 sm:p-6 rounded-xl border border-[rgba(59,130,246,0.15)]">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-white">
            Transparency Features
          </h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center mt-0.5">
                <svg className="w-3 h-3 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm sm:text-base text-gray-300">
                  <span className="text-gray-100 font-semibold">GPG Signed Commits</span>
                  <br />
                  <span className="text-xs sm:text-sm text-gray-400">
                    Commits are cryptographically signed to verify author identity. Look for the "Verified" badge on GitHub commits.
                  </span>
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center mt-0.5">
                <svg className="w-3 h-3 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm sm:text-base text-gray-300">
                  <span className="text-gray-100 font-semibold">Automatic Deployments</span>
                  <br />
                  <span className="text-xs sm:text-sm text-gray-400">
                    Every push to the main branch triggers an automatic build and deployment. 
                    The build process uses the exact commit SHA shown above, ensuring reproducibility.
                  </span>
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-yellow-500/20 flex items-center justify-center mt-0.5">
                <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm sm:text-base text-gray-300">
                  <span className="text-gray-100 font-semibold">Build Reproducibility</span>
                  <br />
                  <span className="text-xs sm:text-sm text-gray-400">
                    The build time and commit SHA are embedded in the application, allowing you to verify 
                    that the deployed version matches the source code at that specific commit.
                  </span>
                </p>
              </div>
            </div>
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
            <div className="mt-3 text-gray-500"># Verify the commit matches</div>
            <div className="whitespace-nowrap">git rev-parse HEAD</div>
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
            href={commitUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-center bg-gradient-to-r from-pink-500 to-orange-500 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg hover:from-pink-600 hover:to-orange-600 transition-all font-semibold text-sm sm:text-base shadow-lg"
          >
            View This Commit on GitHub
          </a>
          <a
            href={CLOUDFLARE_PAGES_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-center bg-gradient-to-r from-[rgba(255,107,107,0.15)] to-[rgba(255,142,83,0.15)] border border-[rgba(255,107,107,0.3)] text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg hover:from-[rgba(255,107,107,0.25)] hover:to-[rgba(255,142,83,0.25)] transition-all font-semibold text-sm sm:text-base"
          >
            View Live Deployment
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-center bg-gradient-to-r from-[rgba(59,130,246,0.15)] to-[rgba(147,51,234,0.15)] border border-[rgba(59,130,246,0.3)] text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg hover:from-[rgba(59,130,246,0.25)] hover:to-[rgba(147,51,234,0.25)] transition-all font-semibold text-sm sm:text-base"
          >
            View Repository
          </a>
        </div>
      </div>
    </div>
  );
};

export default VerifyPage;