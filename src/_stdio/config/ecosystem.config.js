module.exports = {
  apps: [
    {
      name: '{{PM2_SERVER_NAME}}',
      script: './server.js',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
