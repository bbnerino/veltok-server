import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { multerOptionsFactory } from '../utils/multer.options.factory';
import { FileService } from './file.service';
import { UserController } from 'src/user/user.controller';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';

@Module({
  // MulterModule을 사용하기 위해 imports에 MulterModule을 추가합니다.

  // FileService를 providers에 추가합니다.
  providers: [FileService],
  // FileController를 controllers에 추가합니다.
  // FileService를 exports에 추가합니다.
  exports: [FileService],
})
export class FileModule {}
