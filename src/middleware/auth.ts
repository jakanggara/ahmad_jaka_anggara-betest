import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthorizedRequest } from "../interfaces/response";

const MiddlewareAuth = (req: AuthorizedRequest & Request, res: Response, next: NextFunction) => {
  
  const token = (req.headers as unknown as {[key: string] : string})["authorization"];

  if (token === null || token === undefined) {
    res
      .status(401)
      .json({ msg: "null token" });
    return
  }
  
  try {
    const [bearer, content] = token.split(" ")
    if (bearer !== "Bearer") {
      throw Error("no bearer")
    }
    const payload = jwt.verify(content, process.env.JWTSECRET ?? "");
    req.id = (payload as jwt.JwtPayload).id;
    next();
  } catch (err) {
    res
      .status(401)
      .json({ msg: "invalid token" });
  }
}

export default MiddlewareAuth
