import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from 'vite-tsconfig-paths';
import { execSync } from 'child_process';

// Get git commit SHA (Cloudflare Pages provides CF_PAGES_COMMIT_SHA)
const getGitCommitSHA = () => {
  // Use Cloudflare's commit SHA if available
  if (process.env.CF_PAGES_COMMIT_SHA) {
    return process.env.CF_PAGES_COMMIT_SHA;
  }
  // Fallback to git command for local development
  try {
    return execSync('git rev-parse HEAD').toString().trim();
  } catch {
    return 'dev';
  }
};

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    tsconfigPaths(),
  ],
  define: {
    'import.meta.env.VITE_COMMIT_SHA': JSON.stringify(getGitCommitSHA()),
    'import.meta.env.VITE_BUILD_TIME': JSON.stringify(new Date().toISOString()),
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
    },
  },
  resolve: {
    alias: {
      buffer: 'buffer/',
    },
  },
});