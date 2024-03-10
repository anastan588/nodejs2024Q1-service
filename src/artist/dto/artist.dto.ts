import { IsBoolean, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class IDArtistParametr {
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  id: string;
}

export class NewAtristParametr {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsBoolean()
  @IsNotEmpty()
  grammy: boolean;
}

export class UpdateAtristParametr {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsBoolean()
  @IsNotEmpty()
  grammy: boolean;
}
