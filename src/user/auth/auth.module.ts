import { Module } from '@nestjs/common';
import { UserModule } from '../user.module';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from '../user.service';
import { AuthService } from './auth.service';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.register({}), // JWT 모듈 등록
  ],
  controllers: [AuthController],
  providers: [UserService, AuthService],
})
export class AuthModule {}
