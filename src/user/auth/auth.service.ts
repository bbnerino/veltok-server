import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  getAccessToken({ user }) {
    return this.jwtService.sign(
      {
        email: user.email,
        sub: user.id,
        nickName: user.nickName,
      },
      {
        secret: process.env.ACCESS_TOKEN_SECRET,
        expiresIn: '15m',
      },
    );
  }
  setRefreshToken({ user, res }) {
    const refreshToken = this.jwtService.sign(
      {
        email: user.email,
        sub: user.id,
        nickName: user.nickName,
      },
      {
        secret: process.env.REFRESH_TOKEN_SECRET,
        expiresIn: '7d',
      },
    );
    // 배포 환경일 때만 쿠키에 refreshToken을 담습니다.
    res.setHeader('Set-Cookie', `refreshToken=${refreshToken}`);
    return;
  }
}

// 컨트롤러에서 받은 user 객체를 통해 토큰을 발급하는 getAccessToken 메서드를 구현했습니다.
// getAccessToken 메서드는 jwtService.sign 메서드를 통해 토큰을 발급합니다.
// 첫 번째 인자로는 토큰에 담을 데이터를 전달합니다.
// 두 번째 인자로는 토큰의 옵션을 전달합니다.
// secret은 토큰의 비밀키를 전달합니다.
// expiresIn은 토큰의 만료 시간을 전달합니다.
// 토큰의 만료 시간은 5분으로 설정했습니다.
// 토큰의 만료 시간은 토큰을 발급할 때 설정할 수 있습니다.
// 토큰의 만료 시간이 지나면 토큰을 사용할 수 없습니다.
// 토큰의 만료 시간이 지나면 토큰을 재발급해야 합니다.
