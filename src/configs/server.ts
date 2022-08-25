const serverConfig = {
  BASE_API_PATH: process.env.BASE_API_PATH || '/api',
  PORT: process.env.PORT || 8080,
  CORS_ORIGIN: process.env.CORS_ORIGIN || [
    'http://localhost:3000',
    'https://studio.apollographql.com',
    'https://mountain-app-server-test.herokuapp.com/api',
  ],
};

export default serverConfig;
