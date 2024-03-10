import { IsArray, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class IDFavParametr {
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  id: string;
}
