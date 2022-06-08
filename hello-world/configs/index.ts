type Config = {
  [key: string]: boolean | number | string | undefined;
};

const configValues: Config = {}

export const getConfigs = () => {
  return {
    database: {
      host: configValues.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_DATABASE,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
    },
  };
}

export const loadConfigs = (data: Config) => {
  Object.assign(configValues, data)
}

