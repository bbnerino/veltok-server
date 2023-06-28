import { HttpStatus, Injectable } from '@nestjs/common';
import { SignupForm } from './data/user.form';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './data/user.dto';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) // user.entity.ts에 정의한 User를 주입
    private userRepository: Repository<User>, // Repository를 주입
  ) {}

  // 전체 유저 조회
  async getAllUser(): Promise<UserDto[]> {
    const users = await this.userRepository.find();
    const userDtos = users.map((user) => new UserDto(user));
    return userDtos;
  }

  // 유저 조회 =================
  async findById(id: number): Promise<UserDto> {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) return null;
    return new UserDto(user);
  }

  // 유저 조회 (로그인용)
  async findByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
    });
    if (!user) return null;
    return user;
  }

  async findByNickName(nickName: string) {
    const user = await this.userRepository.findOne({
      where: { nickName },
    });
    if (!user) return null;
    return new UserDto(user);
  }
  // ===========================

  // 회원가입
  create(res: Response, signupForm: SignupForm) {
    const newUser = {
      ...signupForm,
      password: bcrypt.hashSync(signupForm.password, 10),
    };
    this.userRepository.save(newUser);
    return res.status(HttpStatus.CREATED).json();
  }

  // 유저 정보 수정
  async updateUserById(res: Response, id: string, signupForm: SignupForm) {
    const user = await this.userRepository.findOneById(id);
    if (!user) return res.status(HttpStatus.NOT_FOUND).json();

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
