import { Router } from "express";
import UserController from "../3-layer/controller/user.controller";
import { container } from "tsyringe";
import auth from "../middleware/auth";
import validator from '../middleware/validate';

const usercontroller = container.resolve(UserController);
const router = Router();

router.post('/login',validator.login,usercontroller.login);

router.get('/logout',usercontroller.logout);

router.get('/me',auth.verifyUser,usercontroller.getProfile);

router.route('/')
.post(validator.signup,usercontroller.signup)
.patch(validator.updateUser,auth.verifyUser,usercontroller.updateUser)
.delete(auth.verifyUser,usercontroller.deleteUser)

export default router;
