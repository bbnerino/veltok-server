import { User } from 'src/user/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20 })
  title: string;

  @Column({ type: 'varchar', length: 50 })
  content: string;

  // eager 옵션을 true로 설정하면, 해당 엔티티를 조회할 때마다 관계된 엔티티를 항상 함께 조회합니다.
  @ManyToOne(() => User, (user) => user.articles, { eager: true })
  user: User;
}
