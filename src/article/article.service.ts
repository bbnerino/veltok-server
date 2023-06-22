import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from 'src/member/member.entity';
import { Article } from './article.entity';
import { Repository } from 'typeorm';
import { ArticleForm } from './data/ArticleForm';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
    @InjectRepository(Member)
    private memberRepository: Repository<Member>,
  ) {}

  getAllArticle(): Promise<Article[]> {
    return this.articleRepository.find();
  }

  getArticleById(id: number): Promise<Article> {
    return this.articleRepository.findOneById(id);
  }

  async postArticle(articleForm: ArticleForm): Promise<Article> {
    const memberId = articleForm.memberId;
    const member = await this.memberRepository.findOneById(memberId);

    if (!member) return null;

    return this.articleRepository.save({ ...articleForm, member: member });
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
