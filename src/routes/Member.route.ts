import { Router } from 'express';
import { MemberController } from '../controllers/member/member.controller';

export class MemberRoute{
    public router:Router;
    public memberController: MemberController;

    constructor() {
        this.memberController = new MemberController();
        this.router = Router();
        this.routes();
    }

    routes(){
        this.router.post('', this.memberController.saveMember);
    }
}