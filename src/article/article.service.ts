import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Article } from './article.entity';
import { Repository } from 'typeorm';
import { ArticleForm } from './data/ArticleForm';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  getAllArticle(): Promise<Article[]> {
    return this.articleRepository.find();
  }

  getArticleById(id: number): Promise<Article> {
    return this.articleRepository.findOneById(id);
  }

  async postArticle(articleForm: ArticleForm): Promise<Article> {
    const userId = articleForm.userId;
    const user = await this.userRepository.findOneById(userId);

    if (!user) return null;

    return this.articleRepository.save({ ...articleForm, user: user });
  }

  async updateArticleById(
    id: number,
    articleForm: ArticleForm,
  ): Promise<Article> {
    const articleToUpdate = await this.articleRepository.findOneById(id);
    if (!articleToUpdate) return null;

    return this.articleRepository.save({
      ...articleToUpdate,
      ...articleForm,
    });
  }

  async deleteArticleById(id: number): Promise<any> {
    const article = await this.articleRepository.findOneById(id);
    this.articleRepository.remove(article);
    return { deleted: true };
  }
}
