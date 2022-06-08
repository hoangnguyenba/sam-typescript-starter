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


export const init = (opts?: DBConfig): middy.MiddlewareObj<APIGatewayProxyEvent, APIGatewayProxyResult> => {

  const options = { ...defaults, ...opts }

  const before: middy.MiddlewareFn<APIGatewayProxyEvent, APIGatewayProxyResult> = async (
    request
  ): Promise<void> => {

    const configs = await request.internal.configs

    // Your middleware logic
    connection = await mysql.createConnection({
      ...options,
      host     : configs.DB_HOST,
      port     : configs.DB_PORT,
      user     : configs.DB_USERNAME,
      password : configs.DB_PASSWORD,
      database : configs.DB_DATABASE
    });
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