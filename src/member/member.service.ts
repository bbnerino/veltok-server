import { Injectable } from '@nestjs/common';
import { SignupForm } from './data/Signupform';
import { Member } from './member.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private memberRepository: Repository<Member>,
  ) {}

  // 전체 유저 조회
  getAllMember(): Promise<Member[]> {
    return this.memberRepository.find();
  }

  // 유저 아이디로 조회
  getUserById(id: number): Promise<Member> {
    const member = this.memberRepository.findOneById(id);
    if (!member) return null;
    return member;
  }

  // 회원가입
  postUser(signupForm: SignupForm): Promise<Member> {
    return this.memberRepository.save(signupForm);
  }

  // 유저 정보 수정
  async updateUserById(id: string, signupForm: SignupForm): Promise<Member> {
    const member = await this.memberRepository.findOneById(id);
    if (!member) return null;

    return this.memberRepository.save({
      ...member,
      ...signupForm,
    });
  }

  // 유저 삭제
  async deleteUserById(id: string): Promise<any> {
    const member = await this.memberRepository.findOneById(id);
    this.memberRepository.remove(member);
    return { deleted: true };
  }
}
