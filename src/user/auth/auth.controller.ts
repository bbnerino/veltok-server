import {
  Body,
  Controller,
  Post,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user.service';
import { SignInForm } from './auth.form';
import * as bycrypt from 'bcrypt';
import { Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('signin')
  async signin(@Res() res: Response, @Body() signInForm: SignInForm) {
    const { email, password } = signInForm;
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('이메일이 존재하지 않습니다.');
    }
    const isMatch = bycrypt.compareSync(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
    }
    // refresh token 발급
    this.authService.setRefreshToken({ user, res });

    // access token 발급
    const jwt = this.authService.getAccessToken({ user });
    return res.status(200).json({ message: '로그인 성공', jwt: jwt });
  }
}
