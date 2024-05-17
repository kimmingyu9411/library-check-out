import { Router } from "express";
import { container } from "tsyringe";
import auth from "../middleware/auth";
import validator from '../middleware/validate';
import BookController from "../3-layer/controller/book.controller";

const bookcontroller = container.resolve(BookController);
const router = Router();

router.post('/',auth.verifyUser,bookcontroller.createBook);
router.get('/me',auth.verifyUser,bookcontroller.getBooksByUserId)
router.get('/get',bookcontroller.getBooks)
export default router;