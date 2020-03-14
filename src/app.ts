import express from 'express';
import {urlencoded, json} from 'body-parser';
import { environment } from './enviroments/enviroments';
import { swaggerDocument } from './swagger/swagger';

const api = require('./routes/index');
const log = require('fancy-log');
const swaggerUi = require('swagger-ui-express');

const app: express.Application = express();   

export class App{

    private connection;

    configuration(){
        app.use(urlencoded({ extended: false }));
        app.use(json());
        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        app.use('/api/v1', api);
    }
    start(){
        this.configuration();
        app.listen(environment.PORT, () => {
            log.info(`API REST running: http://localhost:${environment.PORT}`)
        });
    }

    
}

