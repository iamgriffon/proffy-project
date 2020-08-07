import {Router} from 'express';
import ClassesController from './controllers/classesController';
import UsersController from './controllers/usersController';
import ConnectionsController from './controllers/connectionsController';


const usersController = new UsersController();
const classesController = new ClassesController();
const connectionsController = new ConnectionsController();

const routes = Router();

routes.get('/userinfo', usersController.index); //Rota para testes

routes.post('/classes', classesController.create);
routes.get('/classes', classesController.index);

routes.post('/connections', connectionsController.create);
routes.get('/connections', connectionsController.index);

export default routes;