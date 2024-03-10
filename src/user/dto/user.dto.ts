import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class IDUserParametr {
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  id: string;
}

export class NewUserParametr {
  @IsString()
  @IsNotEmpty()
  login: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class UpdateUserParametr extends NewUserParametr {
  @IsString()
  @IsNotEmpty()
  oldPassword: string;
  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
