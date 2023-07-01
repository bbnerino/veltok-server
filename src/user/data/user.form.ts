export interface SignupForm {
  email: string;
  password: string;
  nickName: string;
  file: Express.Multer.File;
}

export interface UpdatePasswordForm {
  email: string;
  prevPassword: string;
  password: string;
}
