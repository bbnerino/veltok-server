import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { FileService } from 'src/common/file/file.service';
import { FileModule } from 'src/common/file/file.module';
import { MulterModule } from '@nestjs/platform-express';
import { multerOptionsFactory } from 'src/common/utils/multer.options.factory';
import { UserRepository } from './user.repository';
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    FileModule,
    MulterModule.registerAsync({
      useFactory: multerOptionsFactory,
    }),
  ],
  providers: [UserService, FileService, UserRepository], // UserService를 providers에 추가
  controllers: [UserController],
  exports: [UserService, UserRepository], // 다른 모듈에서 UserService를 사용할 수 있도록 exports에 추가
})
export class UserModule {}
