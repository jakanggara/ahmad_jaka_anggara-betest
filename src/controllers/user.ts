import { Request, Response } from 'express';
import repository from '../repository';
import { IUser } from '../interfaces/user';
import redisClient from '../infra/redis';

const getAllUsers = async (req: Request, res: Response) => {
    try {
      const users = await repository.getUsers({limit: Number(req.params["limit"]), page: Number(req.params["page"])});
      res.json({message: "success", data: users});
    } catch (err) {
      res.status(500).json({ message: (err as Error).message });
    }
  };

const getUserByAccountNumber = async (req: Request, res: Response) => {
  const accountNumber = Number(req.params["id"])
  try {
    const users = await repository.getUser({accountNumber});
    redisClient.setex(accountNumber, 3600, JSON.stringify(users));
    res.json({message: "success", data: users});
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

const getUserByIdentityNumber = async (req: Request, res: Response) => {
    const identityNumber = Number(req.params["id"])
    try {
      const users = await repository.getUser({identityNumber});
      redisClient.setex(identityNumber, 3600, JSON.stringify(users));
      res.json({message: "success", data: users});
    } catch (err) {
      res.status(500).json({ message: (err as Error).message });
  }
};

const createUser = async (req: Request, res: Response) => {
  const data: IUser = req.body
  try {
    const users = await repository.createUser(data);
    res.status(201).json({message: "success", data: users});
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: (err as unknown as any)._message });
  }
};

const updateUser = async (req: Request, res: Response) => {
  const id: string = req.params["id"]
  const data: IUser = req.body
  try {
    const users = await repository.updateUser(id, data);
    res.json({message: "success", data: {...users, ...data}});
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const id: string = req.params["id"]
  try {
    const users = await repository.deleteUser(id);
    res.json({message: "success", data: users});
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

  export default { getAllUsers, getUserByAccountNumber, getUserByIdentityNumber, createUser, updateUser, deleteUser }
