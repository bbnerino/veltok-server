import { Module } from '@nestjs/common';
import { UserModule } from '../user.module';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from '../user.service';
import { AuthService } from './auth.service';
import { JwtRefreshStrategy } from './jwt/jwt-refresh.strategy';
import { JwtAccessStrategy } from './jwt/jwt-access.strategy';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.register({}), // JWT 모듈 등록
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtRefreshStrategy, JwtAccessStrategy, UserService],
  exports: [JwtRefreshStrategy, JwtAccessStrategy],
})
export class AuthModule {}
