import { User } from '../user.entity';

export class UserDto {
  id: number;
  email: string;
  nickName: string;
  profileUrl: string;

  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.nickName = user.nickName;
    this.profileUrl = user.profileUrl;
  }
}
