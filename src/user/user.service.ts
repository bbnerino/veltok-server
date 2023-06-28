import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignupForm, UpdatePasswordForm } from './data/user.form';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './data/user.dto';
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
    if (!user) throw new UnauthorizedException('유저가 존재하지 않습니다.');
    return new UserDto(user);
  }

  // 유저 조회 (로그인용)
  async findByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
    });
    if (!user) throw new UnauthorizedException('이메일이 존재하지 않습니다.');
    return user;
  }

  async findByNickName(nickName: string) {
    const user = await this.userRepository.findOne({
      where: { nickName },
    });
    if (!user) throw new UnauthorizedException('유저가 존재하지 않습니다.');
    return new UserDto(user);
  }

  // 회원가입
  create(signupForm: SignupForm) {
    const newUser = {
      ...signupForm,
      password: bcrypt.hashSync(signupForm.password, 10),
    };
    this.userRepository.save(newUser);
  }

  // 유저 정보 수정
  async updateById(id: string, signupForm: SignupForm) {
    const user = await this.userRepository.findOneById(id);
    if (!user) return null;
    const newUser = {
      ...user,
      ...signupForm,
    };
    this.userRepository.save(newUser);
    return new UserDto(newUser);
  }

  // 유저 삭제
  async deleteById(id: string) {
    const user = await this.userRepository.findOneById(id);
    this.userRepository.remove(user);
  }

  async updatePassword(updatePasswordForm: UpdatePasswordForm) {
    const { email, password, prevPassword } = updatePasswordForm;
    const user = await this.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('이메일이 존재하지 않습니다.');
    }
    const isMatch = bcrypt.compareSync(prevPassword, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
    }
    const newUser = {
      ...user,
      password: bcrypt.hashSync(password, 10),
    };
    this.userRepository.save(newUser);
  }
}
