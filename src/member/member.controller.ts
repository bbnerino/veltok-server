import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MemberService } from './member.service';
import { SignupForm } from './data/Signupform';
import { Member } from './member.entity';

@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Get() // 전체 유저 조회
  findAll(): Promise<Member[]> {
    return this.memberService.getAllMember();
  }

  @Get(':id') // 유저 아이디로 조회
  findUserById(@Param('id') id: number): Promise<Member> {
    return this.memberService.getUserById(id);
  }

  @Post() // 회원가입
  postUser(@Body() signupForm: SignupForm): Promise<Member> {
    return this.memberService.postUser(signupForm);
  }

  @Put(':id') // 유저 정보 수정
  updateUserById(
    @Param('id') id: string,
    @Body() signupForm: SignupForm,
  ): Promise<Member> {
    return this.memberService.updateUserById(id, signupForm);
  }

  @Delete(':id') // 유저 삭제
  deleteUserById(@Param('id') id: string): Promise<any> {
    return this.memberService.deleteUserById(id);
  }
}
