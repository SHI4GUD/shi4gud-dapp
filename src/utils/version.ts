export const VERSION_INFO = {
  commit: import.meta.env.VITE_COMMIT_SHA || 'dev',
  buildTime: import.meta.env.VITE_BUILD_TIME || new Date().toISOString(),
};

