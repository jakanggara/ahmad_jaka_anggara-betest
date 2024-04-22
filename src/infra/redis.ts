import { RedisClientType, createClient } from 'redis';

// var redisClient: RedisClientType & RedisModules;
var redisClient: RedisClientType | any
export const connect = async () => {
  try {
    const rc = createClient({name: process.env.REDIS, url: "redis://"+process.env.REDIS})
      .on('error', err => console.log('Redis Client Error', err))
    redisClient = await rc.connect();
    console.info("Info: Redis Connected");
  } catch (err) {
      console.error((err as Error).message);
      process.exit(1);
  }
}

export default redisClient