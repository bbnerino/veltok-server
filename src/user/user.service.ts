import { Injectable } from '@nestjs/common';
import { SignupForm } from './data/Signupform';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // 전체 유저 조회
  getAllUser(): Promise<User[]> {
    return this.userRepository.find();
  }

  // 유저 아이디로 조회
  getUserById(id: number): Promise<User> {
    const user = this.userRepository.findOneById(id);
    if (!user) return null;
    return user;
  }

  // 회원가입
  postUser(signupForm: SignupForm): Promise<User> {
    return this.userRepository.save(signupForm);
  }

  // 유저 정보 수정
  async updateUserById(id: string, signupForm: SignupForm): Promise<User> {
    const user = await this.userRepository.findOneById(id);
    if (!user) return null;

    return this.userRepository.save({
      ...user,
      ...signupForm,
    });
  }

  // 유저 삭제
  async deleteUserById(id: string): Promise<any> {
    const user = await this.userRepository.findOneById(id);
    this.userRepository.remove(user);
    return { deleted: true };
  }
}
