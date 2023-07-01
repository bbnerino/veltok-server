import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Bearer 토큰에서 JWT를 추출합니다.
      secretOrKey: process.env.ACCESS_TOKEN_SECRET,
      ignoreExpiration: false, // 만료된 토큰은 거절합니다.
    });
  }
  // 검증 성공시 실행
  validate(payload: any) {
    return {
      email: payload.email,
      sub: payload.sub,
      nickName: payload.nickName,
    };
  }
}

// @nestjs/passport 패키지의 PassportStrategy 클래스를 상속받아 JwtAccessStrategy 클래스를 구현했습니다.
// PassportStrategy 클래스는 Passport 모듈에서 사용할 수 있는 클래스입니다.
// 생성자 함수에서는 JWT를 추출하는 방법과 JWT의 비밀키를 전달합니다.
// jwtFromRequest는 JWT를 추출하는 방법을 전달합니다.
// ExtractJwt.fromAuthHeaderAsBearerToken()은 Bearer 토큰에서 JWT를 추출합니다.
// secretOrKey는 JWT의 비밀키를 전달합니다.
// validate 메서드는 JWT의 페이로드를 전달합니다.
// 페이로드는 토큰에 담긴 데이터입니다.
// 페이로드를 전달하면 토큰의 유효성을 검사합니다.
// 토큰의 유효성 검사는 JwtService 클래스의 verify 메서드를 통해 수행합니다.
// verify 메서드는 토큰의 유효성을 검사하고 토큰의 페이로드를 반환합니다.
