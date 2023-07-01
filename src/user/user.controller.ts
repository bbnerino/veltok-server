
import { FileService } from './../common/file/file.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Logger,
  Param,
  Post,
  Put,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { SignupForm, UpdatePasswordForm } from './data/user.form';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly fileService: FileService,
  ) {}

  @Post() // 회원가입
  @UseInterceptors(FileInterceptor('file'))
  async postUser(
    @Res() res: Response,
    @Body() signupForm: SignupForm,
    @UploadedFile() file,
  ) {
    console.log('🔥', file);
    const { email } = signupForm;
    if (file) {
      const a = await this.fileService.uploadFile(file);
      Logger.log('🔥:' + a);
    }

    if (await this.userService.findByEmail(email))
      return res.status(400).json({ message: '이미 존재하는 이메일입니다.' });

    const newUser = new User();
    newUser.email = signupForm.email;
    newUser.password = signupForm.password;
    newUser.nickName = signupForm.nickName;

    if (file) {
      newUser.profileUrl = await this.fileService.uploadFile(file);
    }
    this.userService.create(newUser);
    return res.status(HttpStatus.CREATED).json();
  }

  @UseGuards(AuthGuard('access')) // access token 검증
  @Get() // 전체 유저 조회
  async findAll(@Res() res: Response) {
    const users = await this.userService.getAllUser();
    return res.status(200).json(users);
  }
  @Put('password')
  async updatePassword(
    @Res() res: Response,
    @Body() updatePasswordForm: UpdatePasswordForm,
  ) {
    await this.userService.updatePassword(updatePasswordForm);
    return res.status(200).json({ message: '비밀번호 변경 성공' });
  }

  @Get(':id') // 유저 아이디로 조회
  async findById(@Res() res: Response, @Param('id') id: number) {
    const user = await this.userService.findById(id);
    if (!user) {
      return res.status(404).json({ message: '존재하지 않는 유저입니다.' });
    }
    return res.status(200).json(user);
  }

  @Put(':id') // 유저 정보 수정
  async updateById(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() signupForm: SignupForm,
  ) {
    const updateUser = await this.userService.updateById(id, signupForm);
    if (!updateUser) {
      return res.status(404).json({ message: '존재하지 않는 유저입니다.' });
    }
    res.status(HttpStatus.ACCEPTED).json(updateUser);
  }

  @Delete(':id') // 유저 삭제
  deleteById(@Res() res: Response, @Param('id') id: string) {
    this.userService.deleteById(id);
    return res.status(HttpStatus.OK).json({ message: '삭제 성공' });
  }
}