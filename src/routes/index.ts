import { Router } from "express";

import userRouter from "./user.router";
import bookRouter from "./book.router";
const router = Router();

const defaultRouter = [
  { path: "/users", router: userRouter },
  {
    path: "/books",
    router: bookRouter,
  },
];

defaultRouter.forEach((r) => {
  router.use(r.path, r.router);
});

export default router;
