import middy from "@middy/core"
import {getInternal} from "@middy/util"
import inputOutputLogger from '@middy/input-output-logger'
import errorLogger from '@middy/error-logger'
import {loadConfigs} from '@configs'

import { Handler } from 'aws-lambda';

export const middyfy = (handler: Handler) => {
  return middy(handler)
    .use(inputOutputLogger())
    .use(errorLogger())
}
