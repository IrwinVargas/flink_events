import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
import { PasswordHelper } from '../../helpers/password.helper';
import { Member } from '../../entity/member.entity';
import { Identity } from '../../entity/identity.entity';
import { environment } from '../../enviroments/enviroments';
const HttpStatus = require('http-status-codes');


export class AuthController{
    async login(req: Request, res: Response){
      
      let { email, hash, adapter} = req.body;
      
      if( !(email && hash && adapter) )
      res.status(HttpStatus.BAD_REQUEST).send();
      
      const memberRepository = getRepository(Member);
      const identityRepository = getRepository(Identity);
      let identity: Identity;
      let member: Member;
      try {
        member = await memberRepository.findOneOrFail({ where: { email } });
        identity = await identityRepository.findOneOrFail({where:{member:member, adapter}});
        
      } catch (error) {
        res.status(HttpStatus.UNAUTHORIZED).send();
      }
      
      if(!PasswordHelper.checkIfUnencryptedPasswordIsValid(hash, identity.hash))
        res.status(HttpStatus.BAD_REQUEST).json({
          ok:false,
          error: 'email or hash are incorrect'
        });
      
        const token = jwt.sign(
            { memberId: member.id, email: member.email },
            environment.SECRET_TOKEN,
            { expiresIn: "3h" }
            );
        
        res.json({token});
        
    }

    async createMember(req: Request, res: Response){
        let body = req.body;
        const memberRepository = getRepository(Member);
        const identityRepository = getRepository(Identity);

        try {
            
            const newMember = await memberRepository.save({
                name:body.name,
                email: body.email
            });
            await identityRepository.save({member: newMember ,hash:PasswordHelper.hashPassword(body.hash), adapter: body.adapter});
     
            res.status(HttpStatus.CREATED).json(newMember);
        } catch (error) {
            res
            .status(HttpStatus.BAD_REQUEST)
            .json({
                ok:false,
                error: error.message
            });
        }

    }

    async changePassword(req: Request, res: Response) {
        
        if(!res.locals.jwtPayload)res.status(HttpStatus.BAD_REQUEST).send();
        const memberId = res.locals.jwtPayload.memberId;
    
        const { oldPassword, newPassword} = req.body;
        if (!(oldPassword && newPassword)) {
          res.status(HttpStatus.BAD_REQUEST).send();
        }
    
        const identityRepository = getRepository(Identity);
        let identity: Identity;
        try {
          identity = await identityRepository.findOneOrFail({where:{member:{id:memberId}, adapter:'local'}});
        } catch (error) {
          res.status(HttpStatus.UNAUTHORIZED).json({
              ok:false,
              error: error.message
          });
        }
    
        if (!PasswordHelper.checkIfUnencryptedPasswordIsValid(oldPassword, identity.hash)) {
          res.status(HttpStatus.UNAUTHORIZED).json({
              ok:false,
              error:'Password incorrect'
              
          });
          return;
        }
    
        identity.hash = PasswordHelper.hashPassword(newPassword);
        
        identityRepository.save(identity);
    
        res.status(HttpStatus.NO_CONTENT).send();
      };
}

