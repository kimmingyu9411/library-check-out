import { DataType, Optional } from "sequelize";

//User

export interface UserAttributes {
  userId: number;
  isAdmin: boolean;
  name: string;
  nickname: string;
  password: string;
  penaltyPoint: number;
}
export interface UserCreationAttributes
  extends Optional<UserAttributes, "userId"> {}

//Book
export interface BookAttributes {
  bookId: number;
  bookName: string;
  bookState: string;
  userId: number;
  category: string;
}
export interface BookCreationAttributes
  extends Optional<BookAttributes, "bookId"> {}
