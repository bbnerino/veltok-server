import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { SignupForm } from './data/user.form';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post() // 회원가입
  async postUser(@Res() res: Response, @Body() signupForm: SignupForm) {
    const { email, nickName } = signupForm;

    const hasEmail = await this.userService.findByEmail(email);
    if (hasEmail) {
      return res.status(400).json({ message: '이미 존재하는 이메일입니다.' });
    }
    return this.userService.create(res, signupForm);
  }

  @Get() // 전체 유저 조회
  findAll(@Res() res: Response) {
    const users = this.userService.getAllUser();
    return res.status(200).json(users);
  }

  @Get(':id') // 유저 아이디로 조회
  findUserById(@Res() res: Response, @Param('id') id: number) {
    const user = this.userService.findById(id);
    if (!user) {
      return res.status(404).json({ message: '존재하지 않는 유저입니다.' });
    }
    return res.status(200).json(user);
  }

  @Put(':id') // 유저 정보 수정
  updateUserById(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() signupForm: SignupForm,
  ) {
    return this.userService.updateUserById(res, id, signupForm);
  }

  @Delete(':id') // 유저 삭제
  deleteUserById(@Res() res: Response, @Param('id') id: string) {
    return this.userService.deleteUserById(res, id);
  }
}
