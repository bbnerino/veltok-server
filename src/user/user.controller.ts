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
import { SignupForm } from './data/Signupform';
import { User } from './user.entity';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get() // 전체 유저 조회
  findAll(@Res() res: Response) {
    return this.userService.getAllUser(res);
  }

  @Get(':id') // 유저 아이디로 조회
  findUserById(@Res() res: Response, @Param('id') id: number) {
    return this.userService.getUserById(res, id);
  }

  @Post() // 회원가입
  postUser(@Res() res: Response, @Body() signupForm: SignupForm) {
    return this.userService.postUser(res, signupForm);
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
