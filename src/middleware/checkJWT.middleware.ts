import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { environment } from '../enviroments/enviroments';
const HttpStatus = require('http-status-codes');

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
    
    let token = <string>req.headers["authorization"];

    if(!token)
      return res.status(HttpStatus.UNAUTHORIZED).json({ok:false,error:"token is missing."});

    token = token.replace('Bearer ', '');
    let jwtPayload;

    try {
        jwtPayload = <any>jwt.verify(token, environment.SECRET_TOKEN);
        res.locals.jwtPayload = jwtPayload;
      } catch (error) {
        return res.status(HttpStatus.UNAUTHORIZED).send();
      }


      // const { memberId, email } = jwtPayload;
      // const newToken = jwt.sign({ memberId, email }, environment.SECRET_TOKEN, {
      //   expiresIn: "3h"
      // });
      // res.setHeader("token", newToken);
    
      next();
}