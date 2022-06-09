type Config = {
  [key: string]: boolean | number | string | undefined;
};

const configValues: Config = {}

export const getConfigs = () => {
  return {
    cache: {
      expiredIn: configValues.CACHE_EXPIRED_IN || 600,
    }
  };
}

export const loadConfigs = (data: Config) => {
  Object.assign(configValues, data)
}

