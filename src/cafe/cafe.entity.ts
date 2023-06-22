import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// @Entity()
export class Cafe extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 30 })
  title!: string;

  @Column()
  price: number;
}
