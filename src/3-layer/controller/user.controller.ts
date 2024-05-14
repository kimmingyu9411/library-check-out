import "reflect-metadata";
import { container, singleton } from "tsyringe";
import UserService from "../service/user.service";
import { Request, Response } from "express";

const userService = container.resolve(UserService);

@singleton()
export default class UserController {
  private userService = userService;

  signup = async (req: Request, res: Response): Promise<void> => {
    const result = await this.userService.signup(req.body);
    if (result.isSuccessful) {
      res.status(200).json({
        result: result.data,
        message: "회원가입 완료",
      });
    } else {
      res.status(400).json({
        result: result.data,
        message: "회원가입 실패",
      });
    }
  };

  login = async (req: Request, res: Response): Promise<void> => {
    const result = await this.userService.login(req.body);
    if (result) {
      res.cookie("Authorization", result, { path: "/", httpOnly: true });
      res.status(200).json({
        token: result,
        message: "로그인 성공",
      });
    } else {
      res.status(400).json({
        message: "로그인 실패",
      });
    }
  };

  logout = async (req: Request, res: Response): Promise<void> => {
    res.clearCookie("Authorization");
    res.status(200).json({
      message: "로그아웃",
    });
  };

  getProfile = async (req: Request, res: Response): Promise<void> => {
    const userId: string = res.locals.userId;
    this.userService
      .findById(userId)
      .then((data) => res.status(200).json({ user: data }))
      .catch(() => {
        res.status(400).json({ message: "존재하지 않는 회원입니다." });
      });
  };

  updateUser = async (req: Request, res: Response): Promise<void> => {
    const userId: string = res.locals.userId;
    const result = await this.userService.updateUser(userId, req.body);

    if (result) {
      if (result.isSuccessful) {
        res.status(200).json({
          result: result.data,
          message: "업데이트 완료",
        });
      } else {
        res.status(400).json({
          message: "업데이트 정보를 입력해주세요",
        });
      }
    }
  };

  deleteUser = async (req: Request, res: Response): Promise<void> => {
    const userId: string = res.locals.userId;

    const result = await this.userService.deleteUser(userId, req.body);

    if (result) {
      res.clearCookie("Authorization");
      res.status(200).json({
        isSuccessful: result.isSuccessful,
        message: result.message,
      });
    } else {
      res.status(400).json({
        message: "회원 삭제 실패",
      });
    }
  };
}
