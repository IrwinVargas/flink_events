import { Router } from 'express';
import { checkJwt } from '../middleware/checkJWT.middleware';
import { checkRole } from '../middleware/checkRole.middleware';
import { EventController } from '../controllers/event/event.controller';

export class EventRoute{
    public router:Router;
    public controller: EventController;

    constructor() {
        this.controller = new EventController();
        this.router = Router();
        this.routes();
    }

    routes(){
        this.router.post('/', [checkJwt, checkRole(["MEMBER_ROLE", "ADMIN_ROLE"])],this.controller.create);
        this.router.put('/:eventId', [checkJwt, checkRole(["MEMBER_ROLE", "ADMIN_ROLE"])],this.controller.update);
        this.router.delete('/:eventId', [checkJwt, checkRole(["ADMIN_ROLE"])],this.controller.delete);
        this.router.get('/', [checkJwt, checkRole(["MEMBER_ROLE", "ADMIN_ROLE"])],this.controller.events);
        this.router.post('/attendEvent', [checkJwt, checkRole(["MEMBER_ROLE", "ADMIN_ROLE"])],this.controller.attendEvent);
        this.router.post('/organizerEvent', [checkJwt, checkRole(["MEMBER_ROLE", "ADMIN_ROLE"])],this.controller.organizeEvent);
        this.router.get('/statusEvent', [checkJwt, checkRole(["MEMBER_ROLE", "ADMIN_ROLE"])],this.controller.status);
        this.router.get('/:eventId', [checkJwt, checkRole(["MEMBER_ROLE", "ADMIN_ROLE"])],this.controller.event);
    }
}