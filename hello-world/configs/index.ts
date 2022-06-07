type Config = {
  [key: string]: boolean | number | string | undefined;
};

const configValues: Config = {}

export const getConfigs = () => {
  return {
    database: {
      region: process.env.DATA_API_REGION,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_DATABASE,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
    },
  };
}

export const loadConfigs = (data: Config) => {
  Object.assign(configValues, data)
}

