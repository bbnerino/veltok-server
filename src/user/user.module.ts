import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService], // UserService를 providers에 추가
  controllers: [UserController],
  exports: [UserService], // 다른 모듈에서 UserService를 사용할 수 있도록 exports에 추가
})
export class UserModule {}
