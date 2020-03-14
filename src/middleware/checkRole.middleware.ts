import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import { Member } from '../entity/member.entity';
import { RoleByMember } from '../entity/roleByMember.entity';
import { Role } from "../entity/role.entity";
const HttpStatus = require('http-status-codes');

export const checkRole = (roles: Array<string>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const {memberId} = res.locals.jwtPayload;
        const memberRepository = getRepository(Member);

        let member: Member;
        
        try {
          member = await memberRepository.findOne({where:{id:memberId}, relations: ["roles"] });
            
        } catch (err) {
            
          res.status(HttpStatus.UNAUTHORIZED).send();
        }
        let hasAnyRole = false;
        member.roles.forEach(role=>{
            hasAnyRole = roles.includes(role.name)
            return hasAnyRole;
        })
        
        
        if(!hasAnyRole)
            return res.status(HttpStatus.UNAUTHORIZED).send();

        next();

    };
}