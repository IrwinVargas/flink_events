import "reflect-metadata";
import {createConnection} from "typeorm";
import { environment } from './enviroments/enviroments';

const log =  require('fancy-log');

export class Database{

    createDBConnection(){

       return createConnection({
                 type: "mysql",
                 host: environment.DATABASE.HOST,
                 port: environment.DATABASE.PORT,
                 username: environment.DATABASE.USERNAME,
                 password: environment.DATABASE.PASSWORD,
                 database: environment.DATABASE.NAME,
                 entities: [
                     __dirname + "/entity/*.entity.js",
                 ],
                //  extra: { socketPath: `/cloudsql/${environment.DATABASE.CLOUD_SQL_CONNECTION_NAME}` } 
             });
        
    }

}
