import { Router } from 'express';
import { checkJwt } from '../middleware/checkJWT.middleware';
import { checkRole } from '../middleware/checkRole.middleware';
import { CategoryController } from '../controllers/category/category.controller';
export class CategoryRoute{
    public router:Router;
    public controller: CategoryController;

    constructor() {
        this.controller = new CategoryController();
        this.router = Router();
        this.routes();
    }

    routes(){
        this.router.get('/', [checkJwt, checkRole(["MEMBER_ROLE", "ADMIN_ROLE"])],this.controller.categoriesCatalog);
        this.router.get('/eventsByCategory/:categoryId', [checkJwt, checkRole(["MEMBER_ROLE", "ADMIN_ROLE"])],this.controller.eventByCategory);
    }
}