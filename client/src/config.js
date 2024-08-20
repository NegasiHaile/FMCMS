const config = {
  development: {
    apiUrl: process.env.REACT_APP_DEV_API_URL,
  },
  production: {
    apiUrl: process.env.REACT_APP_PROD_API_URL,
  },
};

export const getConfig = () => {
  return process.env.NODE_ENV == "production"
    ? config.production
    : config.development;
};
