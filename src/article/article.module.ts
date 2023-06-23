import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './article.entity';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { User } from 'src/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Article, User])], // User를 추가해줍니다.
  providers: [ArticleService],
  controllers: [ArticleController],
})
export class ArticleModule {}
