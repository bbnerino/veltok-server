import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Article } from './article.entity';
import { ArticleForm } from './data/ArticleForm';
import { ArticleService } from './article.service';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get() // 전체 게시글 조회
  findAll(): Promise<Article[]> {
    return this.articleService.getAllArticle();
  }

  @Get(':id') // 게시글 아이디로 조회
  findArticleById(@Param('id') id: number): Promise<Article> {
    return this.articleService.getArticleById(id);
  }

  @Post() // 게시글 작성
  postArticle(@Body() articleForm: ArticleForm): Promise<Article> {
    return this.articleService.postArticle(articleForm);
  }

  @Put(':id') // 게시글 수정
  updateArticleById(
    @Param('id') id: number,
    @Body() articleForm: ArticleForm,
  ): Promise<Article> {
    const article = this.articleService.getArticleById(id);
    if (!article) return null;
    return this.articleService.updateArticleById(id, articleForm);
  }

  @Delete(':id') // 게시글 삭제
  deleteArticleById(@Param('id') id: number): Promise<any> {
    return this.articleService.deleteArticleById(id);
  }
}
