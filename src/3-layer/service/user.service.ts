import { container, singleton } from "tsyringe";
import bcrypt from "bcrypt";
import { config } from "../../config";
import auth from "../../middleware/auth";
import User from "../../database/model/user.model";
import UserRepository from "../repository/user.repository";
import { UserInfo, LoginInfo } from "../../types/user";

const userRepository = container.resolve(UserRepository);

@singleton()
export default class UserService {
  private userRepository = userRepository;

  public async signup(data: UserInfo) {
    const { isAdmin, name, nickname } = data;

    const password = bcrypt.hashSync(data.password, Number(config.bcrypt.salt));

    return this.userRepository.signup(isAdmin, name, nickname, password);
  }

  public async login(data: LoginInfo) {
    const { nickname, password } = data;
    const user = await this.userRepository.findByNickname(nickname);
    const comparePassword = user?.password;

    if (comparePassword) {
      const result = bcrypt.compareSync(password, comparePassword);
      if (result) {
        const token = auth.getToken(user.userId, user.isAdmin);
        return token;
      } else {
        return null;
      }
    }
  }
  public async findById(userId: string) {
    return this.userRepository.findById(userId);
  }
}
