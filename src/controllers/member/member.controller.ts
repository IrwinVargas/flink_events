import {Response, Request} from 'express';
import { Member } from '../../entity/member.entity';
import { getRepository, Repository, getConnection } from 'typeorm';
const HttpStatus = require('http-status-codes');


export class MemberController{    
    
    public async saveMember(req:Request, res:Response){
        let body = req.body;
        let memberRepository = getRepository<Member>(Member);
        
        try {
            let member = await memberRepository.save(body);
            res
            .status(HttpStatus.CREATED)
            .json({
                ok: true,
                user: member
            });
        } catch (error) {
            
            res
            .status(HttpStatus.BAD_REQUEST)
            .json({
                ok:false,
                error: error.message
            });
        }
    
       
    
    }
}
