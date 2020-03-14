import { Router } from 'express';
import { AuthController } from '../controllers/auth/auth.controller';
import { checkJwt } from '../middleware/checkJWT.middleware';
import { checkRole } from '../middleware/checkRole.middleware';

export class AuthRoute{
    public router:Router;
    public controller: AuthController;

    constructor() {
        this.controller = new AuthController();
        this.router = Router();
        this.routes();
    }

    routes(){
        this.router.post('/register',[checkJwt, checkRole(["ADMIN_ROLE"])], this.controller.createMember);
        this.router.post('/changePassword', [checkJwt, checkRole(["MEMBER_ROLE", "ADMIN_ROLE"])],this.controller.changePassword);
        this.router.post('/login', this.controller.login);
    }
}