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
} from "sequelize-typescript";
import { UserAttributes, UserCreationAttributes } from "../modelInterface";
import Book from "./book.model";

@Table
export default class User extends Model<
  UserAttributes,
  UserCreationAttributes
> {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column(DataType.BIGINT)
  userId!: number;

  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  isAdmin!: boolean;

  @AllowNull(false)
  @Column(DataType.STRING)
  name!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  nickname!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  password!: string;

  @AllowNull(false)
  @Column(DataType.NUMBER)
  penaltyPoint!: number;

  @HasMany(() => Book)
  book!: Book;
}
