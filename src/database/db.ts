import { Model, Sequelize } from "sequelize-typescript";
import { config } from "../config";
import { Transaction } from "sequelize";
import User from "./model/user.model";
import Book from "./model/book.model";
class DBConnector{
    public sq = new Sequelize({
        dialect : 'mysql',
        database : config.db.database,
        host : config.db.host,
        password : config.db.password,
        username : config.db.username,
        models : [User, Book],
        logging : false
    })

    async initDB(){
        await this.sq.sync().then(()=>{
            console.log('🌈 Database is connected 🌈'); 
        });
    }
}
const dbConnector = new DBConnector();

export default dbConnector;
