import middy from "@middy/core"
import inputOutputLogger from '@middy/input-output-logger'
import errorLogger from '@middy/error-logger'
import ssm from '@middy/ssm'
import {getInternal} from "@middy/util"
import {loadConfigs} from '@configs'

import { Handler } from 'aws-lambda';

import {init as initDB} from '@libs/database/rds'

export const middyfy = (handler: Handler) => {
  return middy(handler)
    .use(ssm({
      fetchData: {
        configs: process.env.SSM_CONFIGS_PATH as string
      },
      cacheKey: 'ssm-configs'
    }))
    .use(initDB({
      host: process.env.DB_HOST,
      port: 33306,
      database: 'admindb',
      user: 'root',
      password: 'example'
    }))
    .use(inputOutputLogger())
    .use(errorLogger())
    .before(async (request) => {
      const data = await getInternal(['configs'], request)
      loadConfigs(data.configs)
    })
}
