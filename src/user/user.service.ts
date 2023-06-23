import { HttpStatus, Injectable, Res } from '@nestjs/common';
import { SignupForm } from './data/Signupform';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './data/UserDto';
import { Response } from 'express';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // 전체 유저 조회
  async getAllUser(res: Response) {
    const users = await this.userRepository.find();
    const userDtos = users.map((user) => new UserDto(user));
    return res.status(HttpStatus.OK).json(userDtos);
  }

  // 유저 아이디로 조회
  async getUserById(res: Response, id: number) {
    const user = await this.userRepository.findOneById(id);
    if (!user) return res.status(HttpStatus.NOT_FOUND).json({});
    return res.status(HttpStatus.OK).json(new UserDto(user));
  }

  // 회원가입
  postUser(res: Response, signupForm: SignupForm) {
    const newUser = { ...signupForm };
    this.userRepository.save(newUser);
    return res.status(HttpStatus.CREATED).json();
  }

  // 유저 정보 수정
  async updateUserById(res: Response, id: string, signupForm: SignupForm) {
    const user = await this.userRepository.findOneById(id);
    if (!user) return null;

    this.userRepository.save({
      ...user,
      ...signupForm,
    });
    return res.status(HttpStatus.ACCEPTED).json(new UserDto(user));
  }

  // 유저 삭제
  async deleteUserById(res: Response, id: string) {
    const user = await this.userRepository.findOneById(id);
    this.userRepository.remove(user);
    return res.status(HttpStatus.OK).json();
  }
}
