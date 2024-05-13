import { container, singleton } from "tsyringe";
import dbConnector from "../../database/db";
import User from "../../database/model/user.model";
import Book from "../../database/model/book.model";
import { ResponseData } from "../../types/response";

@singleton()
export default class UserService {
  private sq = dbConnector.sq;
  private userRepository = dbConnector.sq.getRepository(User);

  async signup(
    isAdmin: boolean,
    name: string,
    nickname: string,
    password: string
  ): Promise<ResponseData<User>> {
    const transaction = await this.sq.transaction();
    try {
      const user = await User.create(
        {
          isAdmin,
          name,
          nickname,
          password,
          penaltyPoint: 0,
        },
        { transaction }
      );

      await transaction.commit();
      return { isSuccessful: true, data: user };
    } catch (e) {
      console.error(e);
      await transaction.rollback();
      return { isSuccessful: false, data: null };
    }
  }

  async findByNickname(nickname: string): Promise<User | null> {
    try {
      const user = await this.userRepository.findOne({ where: { nickname } });
      return user;
    } catch (e) {
      console.error(e);
      return null;
    }
  }
  async findById(userId: string): Promise<User | null> {
    try {
      const user = await this.userRepository.findByPk(userId);
      return user;
    } catch (e) {
      console.error(e);
      return null;
    }
  }
}
