import { App } from './app';
import { environment } from './enviroments/enviroments';
import { Database } from './database';
const log =  require('fancy-log');

export const app = new App();
const database = new Database();


database.createDBConnection()
    .then(connection=>{
        
        log.info('DATABASE online!');
        app.start();
    }).catch(err => {
        log.error(err);
        throw err;
    });;

