const configValues: any = {}

export const getConfigs = () => {
  return {
    admindb: {
      region: process.env.DATA_API_REGION,
      endpoint: process.env.DATA_API_ENDPOINT,
      secretArn: process.env.DATA_API_SECRET_ARN,
      resourceArn: process.env.DATA_API_RESOURCE_ARN,
      name: process.env.DATA_API_DATABASE_NAME,
      sslEnabled: process.env.DATA_API_SSL_ENABLE == 'true' && true,
    }
  };
}

export const loadConfigs = (data: any) => {
  Object.assign(configValues, data)
}