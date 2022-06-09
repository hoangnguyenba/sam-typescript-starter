import middy from '@middy/core'
import { createClient } from "redis";
import { getConfigs } from '@configs'

type RedisConfig = {
  url     : string,
};

type RedisClient = ReturnType<typeof createClient>;
let client: RedisClient

export const init = (opts?: RedisConfig): middy.MiddlewareObj<any, any> => {

  const before: middy.MiddlewareFn<any, any> = async (
    request
  ): Promise<void> => {

    const configs = await request.internal.configs

    // Your middleware logic
    client = createClient({
      url: `redis://${configs.REDIS_HOST}:${configs.REDIS_PORT}`
    });
    await client.connect();
  }

  const after: middy.MiddlewareFn<any, any> = async (
    request
  ): Promise<void> => {
    // Your middleware logic
    if (process.env.NODE_ENV === 'test') {
      await client.disconnect()
    }
  }

  return {
    before,
    after
  }
}

export const get = async (opt: {tag: string, key: string}) => {
  const {tag, key} = opt;
  return client.get(generateRedisKey(tag, key));
}

export const set = async (opt: {tag: string, key: string, value: string, expiredIn: number}) => {
  let {tag, key, value, expiredIn} = opt;
  if (expiredIn === undefined) {
    expiredIn = getConfigs().cache.expiredIn as number;
  }
  return client.set(generateRedisKey(tag, key), value, {
    EX: expiredIn
  });
}

const generateRedisKey = (tag: string, key: string) => `tag:${tag}:${key}:key`