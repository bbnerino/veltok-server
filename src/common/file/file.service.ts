import { BadRequestException, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class FileService {
  uploadFile(file: Express.Multer.File) {
    Logger.log('FILE', file.filename);
    if (!file) {
      throw new BadRequestException('파일이 존재하지 않습니다.');
    }

    return file.path;
  }
}
