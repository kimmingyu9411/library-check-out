import { Router } from "express";

import userRouter from "./user.router";

const router = Router();

const defaultRouter = [{ path: "/users", router: userRouter }];

defaultRouter.forEach(r=>{
    router.use(r.path,r.router);
});

export default router;
