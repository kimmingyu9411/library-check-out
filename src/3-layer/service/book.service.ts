import { container, singleton } from "tsyringe";
import { BookInfo } from "../../types/book";
import { ResponseData } from "../../types/response";
import Book from "../../database/model/book.model";
import BookRepository from "../repository/book.repository";

const bookRepository = container.resolve(BookRepository);

@singleton()
export default class BookService {
  private bookRepository = bookRepository;

  createBook(
    bookObj: BookInfo,
    isAdmin: string
  ): Promise<ResponseData<Book> | undefined> {
    if (!isAdmin) {
      return Promise.resolve(undefined);
    }
    const { bookName, category } = bookObj;
    return this.bookRepository.createBook(bookName, category);
  }

  getBooksByCategory(category: string) {
    return this.bookRepository.findBooksByCategory(category);
  }

  getBooksByName(name: string) {
    return this.bookRepository.findBooksByName(name);
  }

  getBooksByUserId(userId: string) {
    return this.bookRepository.findBooksByUserId(userId);
  }

  getBooks() {
    return this.bookRepository.findAllBooks();
  }
}
