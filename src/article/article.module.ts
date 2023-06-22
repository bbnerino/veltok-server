import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './article.entity';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { Member } from 'src/member/member.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Article, Member])], // Member를 추가해줍니다.
  providers: [ArticleService],
  controllers: [ArticleController],
})
export class ArticleModule {}
