import React from 'react';
import { VERSION_INFO } from '../utils/version';

const VerifyPage: React.FC = () => {
  const githubUrl = 'https://github.com/shi4gud/shi4gud-dapp';
  const repoName = 'shi4gud-dapp';
  
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 text-white">Verify This Build</h1>
      
      <div className="space-y-6">
        <div className="bg-zinc-800/50 p-6 rounded-lg border border-zinc-700">
          <h2 className="text-xl font-semibold mb-4 text-white">Current Deployment</h2>
          <div className="space-y-2">
            <p className="text-gray-300">
              <span className="text-gray-400">Commit:</span>{' '}
              <a 
                href={`${githubUrl}/commit/${VERSION_INFO.commit}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-blue-400 hover:text-blue-300 underline"
              >
                {VERSION_INFO.commit}
              </a>
            </p>
            <p className="text-gray-300">
              <span className="text-gray-400">Build Time:</span>{' '}
              <span className="font-mono">{new Date(VERSION_INFO.buildTime).toLocaleString()}</span>
            </p>
          </div>
        </div>

        <div className="bg-zinc-800/50 p-6 rounded-lg border border-zinc-700">
          <h2 className="text-xl font-semibold mb-4 text-white">How to Verify</h2>
          <ol className="list-decimal list-inside space-y-3 text-gray-300">
            <li>Clone the repository from GitHub</li>
            <li>Checkout the specific commit shown above</li>
            <li>Install dependencies and build the project</li>
            <li>Compare your local build output with the deployed version</li>
          </ol>
        </div>

        <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-700">
          <h3 className="text-lg font-semibold mb-3 text-white">Verification Commands</h3>
          <div className="font-mono text-sm text-gray-300 space-y-1">
            <div className="text-gray-500"># Clone the repository</div>
            <div>git clone {githubUrl}</div>
            <div>cd {repoName}</div>
            <div className="mt-3 text-gray-500"># Checkout this exact commit</div>
            <div>git checkout {VERSION_INFO.commit}</div>
            <div className="mt-3 text-gray-500"># Install dependencies and build</div>
            <div>npm ci</div>
            <div>npm run build</div>
            <div className="mt-3 text-gray-500"># The output will be in the dist/ folder</div>
          </div>
        </div>

        <div className="bg-zinc-800/50 p-6 rounded-lg border border-zinc-700">
          <h2 className="text-xl font-semibold mb-4 text-white">What to Compare</h2>
          <p className="text-gray-300 mb-4">
            After building locally, you can compare your build with the deployed version by:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>Checking that the JavaScript bundle contents match</li>
            <li>Verifying the HTML structure is identical</li>
            <li>Comparing asset hashes and file sizes</li>
          </ul>
          <p className="text-gray-400 text-sm mt-4">
            Note: Some build timestamps may differ, but the core code should be identical.
          </p>
        </div>

        <div className="flex gap-4">
          <a 
            href={`${githubUrl}/commit/${VERSION_INFO.commit}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            View This Commit on GitHub
          </a>
          <a 
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-zinc-700 text-white px-6 py-3 rounded-lg hover:bg-zinc-600 transition-colors font-semibold"
          >
            View Repository
          </a>
        </div>
      </div>
    </div>
  );
};

export default VerifyPage;

