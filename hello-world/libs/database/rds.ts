import middy from '@middy/core'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import mysql from 'mysql2/promise'

export let connection: mysql.Connection

type DBConfig = {
  host     ?: string,
  port     ?: number,
  user     ?: string,
  password ?: string,
  database ?: string,
  rowsAsArray?: boolean
};

const defaults: DBConfig = {
  port: 3306,
  rowsAsArray: true
}


export const init = (opts: DBConfig): middy.MiddlewareObj<APIGatewayProxyEvent, APIGatewayProxyResult> => {

  const options = { ...defaults, ...opts }

  const before: middy.MiddlewareFn<APIGatewayProxyEvent, APIGatewayProxyResult> = async (
    request
  ): Promise<void> => {
    // Your middleware logic
    connection = await mysql.createConnection(options);
  }

  const after: middy.MiddlewareFn<APIGatewayProxyEvent, APIGatewayProxyResult> = async (
    request
  ): Promise<void> => {
    // Your middleware logic
    if (process.env.NODE_ENV === 'test') {
      await connection.end()
    }
  }

  return {
    before,
    after
  }
}