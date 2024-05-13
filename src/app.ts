import express from "express";
import cors from 'cors';
import cookieParser from "cookie-parser";
import {config} from './config';
import dbConnector from "./database/db";
import router from "./routes";

export default class ExpressApp{
    private app = express();
    private db = dbConnector;

    serverSetUp(){
        this.app.use(cors({
            origin:"*",
            credentials:true
        }));
        this.app.use(express.json());
        this.app.use(cookieParser());
        this.app.use('/',router);
    }

    runServer(){
        this.db.initDB();
        this.app.listen(config.server.port,()=>{
            console.log("🔥".repeat(40));
            console.log(`Server is running on ${config.server.port}, http://localhost:${config.server.port}`);
        });
    }
}

