import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

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
