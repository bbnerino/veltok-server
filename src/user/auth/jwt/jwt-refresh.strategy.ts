import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';

export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor() {
    super({
      jwtFromRequest: (req) => {
        const cookie = req.cookies['refreshToken'];
        return cookie;
      },
      secretOrKey: process.env.ACCESS_TOKEN_SECRET,
      ignoreExpiration: false,
    });
  }
  validate(payload: any) {
    return {
      email: payload.email,
      sub: payload.sub,
      nickName: payload.nickName,
    };
  }
}
