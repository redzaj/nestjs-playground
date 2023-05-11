const logging = {
  // out_file: process.env.LOG_FILE,
  // error_file: process.env.LOG_FILE,
};

module.exports = {
  apps: [
    {
      name: 'api',
      script: 'pnpm',
      args: 'exec ts-node-dev --quiet ./src/apps/api/main.ts',
      ...logging,
      env: {
        NODE_ENV: 'development',
      },
    },
    {
      name: 'courier',
      script: 'pnpm',
      args: 'exec ts-node-dev --quiet ./src/services/courier/main.ts',
      ...logging,
      env: {
        NODE_ENV: 'development',
      },
    },
    {
      name: 'store',
      script: 'pnpm',
      args: 'exec ts-node-dev --quiet ./src/services/store/main.ts',
      ...logging,
      env: {
        NODE_ENV: 'development',
      },
    },
  ],
  merge_logs: true,
};
