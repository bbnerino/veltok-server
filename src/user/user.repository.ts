import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly dataSource: DataSource,
  ) {}

  getAll = async () => {
    const data = await this.dataSource.query('SELECT * FROM user');
    return data;
  };

  getOne = async (id: number) => {
    // const data = await this.userRepository
    //   .createQueryBuilder('user')
    //   .where('user.id = :id', { id })
    //   .getOne();

    const data = await this.dataSource.query(
      `SELECT * FROM user WHERE id = ${id}`,
    );
    return data[0];
  };
}
