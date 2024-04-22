import { Request, Response } from "express"
import user from "./user"
import jwt from 'jsonwebtoken'
import repository from "../repository"

const login = async (req: Request, res: Response) => {
    const {email} = req.body
    
    try {
        const user = await repository.getUser({emailAddress: email})
        if (user === null) {
            res.status(401).json({message: "unauhtorized: no account"})
            return
        }
        const token = jwt.sign(user.toJSON(), process.env.JWTSECRET ?? "")
        res.json({token: `Bearer ${token}`})
    } catch (error) {
        res.status(401).json({message: `unauhtorized: ${error}`})
    }
}

const register = user.createUser

export default { login, register }
