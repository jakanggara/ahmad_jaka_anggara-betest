import { NextFunction, Request, Response } from "express";
import redisClient from "../infra/redis";
import { RedisClientType } from "redis";

const check = async (arg:string, res: Response, next: NextFunction) => {
    const data = await (redisClient as RedisClientType).get(arg)
    if (data) {
        res.json(JSON.parse(data))
    } else {
        next()
    }
}

export const cacheUserDataAccountNumber = async (req: Request, res: Response, next: NextFunction) =>  {
    const accountNumber = req.params.id;
    check(`accountNumber:${accountNumber}`, res, next)
}

export const cacheUserDataIdentityNumber = async (req: Request, res: Response, next: NextFunction) =>  {
    const identityNumber = req.params.id;
    check(`identityNumber:${identityNumber}`, res, next)
}
