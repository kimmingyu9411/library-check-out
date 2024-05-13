import ExpressApp from "./app";
import DBConnector from "./database/db";

const app : ExpressApp = new ExpressApp();

app.serverSetUp();
app.runServer();