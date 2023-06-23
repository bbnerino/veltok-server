import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { SignupForm } from './data/Signupform';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get() // 전체 유저 조회
  findAll(): Promise<User[]> {
    return this.userService.getAllUser();
  }

  @Get(':id') // 유저 아이디로 조회
  findUserById(@Param('id') id: number): Promise<User> {
    return this.userService.getUserById(id);
  }

  @Post() // 회원가입
  postUser(@Body() signupForm: SignupForm): Promise<User> {
    return this.userService.postUser(signupForm);
  }

  @Put(':id') // 유저 정보 수정
  updateUserById(
    @Param('id') id: string,
    @Body() signupForm: SignupForm,
  ): Promise<User> {
    return this.userService.updateUserById(id, signupForm);
  }

  @Delete(':id') // 유저 삭제
  deleteUserById(@Param('id') id: string): Promise<any> {
    return this.userService.deleteUserById(id);
  }
}
