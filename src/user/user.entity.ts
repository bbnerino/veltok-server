import { Article } from 'src/article/article.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20, unique: true })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  nickName: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  profileUrl: string;

  // 1:N 관계 설정
  @OneToMany(() => Article, (article) => article.user)
  articles: Article[];
}
