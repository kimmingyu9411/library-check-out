import { container, singleton } from "tsyringe";
import BookService from "../service/book.service";
import { Request, Response } from "express";

const bookService = container.resolve(BookService);

@singleton()
export default class BookController {
  private bookService = bookService;

  createBook = async (req: Request, res: Response): Promise<void> => {
    const isAdmin = res.locals.isAdmin;
    const result = await this.bookService.createBook(req.body, isAdmin);
    if (result) {
      if (result.isSuccessful) {
        res.status(200).json({
          result: result.data,
          message: "책 생성 완료",
        });
      } else {
        res.status(400).json({
          result: result.data,
          message: "책 생성 실패",
        });
      }
    } else {
      res.status(400).json({ message: "권한이 없습니다." });
    }
  };

  getBooks = async (req: Request, res: Response): Promise<void> => {
    let result;
    const category = req.query.category as string;
    const name = req.query.name as string;

    category != undefined
      ? (result = await this.bookService.getBooksByCategory(category))
      : name != undefined
      ? (result = await this.bookService.getBooksByName(name))
      : (result = await this.bookService.getBooks());

    if (result.isSuccessful) {
      res.status(200).json({
        isSuccessful: result.isSuccessful,
        data: result.data,
      });
    } else {
      res.status(400).json({
        isSuccessful: result.isSuccessful,
        data: "도서 조회에 실패하였습니다.",
      });
    }
  };

  getBooksByUserId = async (req: Request, res: Response): Promise<void> => {
    const userId = res.locals.userId;
    const result = await this.bookService.getBooksByUserId(userId);

    if (result.isSuccessful) {
      res.status(200).json({
        isSuccessful: result.isSuccessful,
        data: result.data,
      });
    } else {
      res.status(400).json({
        isSuccessful: result.isSuccessful,
        data: "도서 조회에 실패하였습니다.",
      });
    }
  };
}
