import { singleton } from "tsyringe";
import dbConnector from "../../database/db";
import { ResponseData } from "../../types/response";
import { Op } from "sequelize";
import Book from "../../database/model/book.model";

@singleton()
export default class BookRepository {
  private sq = dbConnector.sq;
  private BookRepository = dbConnector.sq.getRepository(Book);

  async createBook(
    bookName: string,
    category: string
  ): Promise<ResponseData<Book>> {
    const transaction = await this.sq.transaction();
    try {
      const userId = 0;
      const bookState = "대출가능";
      const book = await Book.create(
        { userId, bookName, bookState, category },
        { transaction }
      );
      await transaction.commit();
      return { isSuccessful: true, data: book };
    } catch (e) {
      console.error(e);
      await transaction.rollback();
      return { isSuccessful: false, data: null };
    }
  }

  async findBooksByCategory(category: string): Promise<ResponseData<Book>> {
    try {
      const books = await Book.findAll({
        where: {
          category,
        },
      });
      const result = {
        isSuccessful: true,
        data: books,
      };
      return result;
    } catch (e) {
      console.error(e);
      const result = {
        isSuccessful: false,
        data: null,
      };
      return result;
    }
  }
  async findBooksByName(name: string): Promise<ResponseData<Book>> {
    try {
      const books = await Book.findAll({
        where: {
          bookName: { [Op.substring]: `${name}` },
        },
      });
      const result = {
        isSuccessful: true,
        data: books,
      };
      return result;
    } catch (e) {
      console.error(e);
      const result = {
        isSuccessful: false,
        data: null,
      };
      return result;
    }
  }

  async findBooksByUserId(userId: string): Promise<ResponseData<Book>> {
    try {
      const books = await Book.findAll({
        where: {
          userId,
        },
      });
      const result = {
        isSuccessful: true,
        data: books,
      };
      return result;
    } catch (e) {
      console.error(e);
      const result = {
        isSuccessful: false,
        data: null,
      };
      return result;
    }
  }

  async findAllBooks(): Promise<ResponseData<Book>> {
    try {
      const books = await Book.findAll();
      
      const result = {
        isSuccessful: true,
        data: books,
      };
      return result;
    } catch (e) {
      console.error(e);
      const result = {
        isSuccessful: false,
        data: null,
      };
      return result;
    }
  }
}
