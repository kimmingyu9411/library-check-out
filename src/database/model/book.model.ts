import {
  AllowNull,
  AutoIncrement,
  Column,
  Default,
  HasMany,
  HasOne,
  Model,
  PrimaryKey,
  Table,
  Unique,
  DataType,
  ForeignKey,
  BelongsTo,

} from "sequelize-typescript";
import { BookAttributes, BookCreationAttributes } from "../modelInterface";
import User from "./user.model";

@Table
export default class Book extends Model<BookAttributes, BookCreationAttributes> implements BookAttributes {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    bookId!: number;

    @ForeignKey(() => User)
    @AllowNull(false)
    @Column(DataType.BIGINT)
    userId!: number;

    @AllowNull(false)
    @Column(DataType.STRING)
    bookName!: string;

    @AllowNull(false)
    @Column(DataType.ENUM('대출가능', '대출중', '연체', '분실', '대출불가', '폐기'))
    bookState!: string;

    @AllowNull(false)
    @Column(DataType.ENUM('소설', '만화', '종교', '예술', '역사', '과학', '철학'))
    category!: string;

    @BelongsTo(() => User)
    user!: User;
}
