import {Router} from 'express';
import { MemberRoute } from './Member.route';
import { AuthRoute } from './Auth.route';
import { EventRoute } from './Event.route';
import { CategoryRoute } from './Category.route';
const api = Router();
const ping = require('../controllers/ping/ping.controller');

api.use(ping);
api.use('/member',new MemberRoute().router);
api.use('/auth',new AuthRoute().router);
api.use('/event',new EventRoute().router);
api.use('/category',new CategoryRoute().router);

module.exports = api;