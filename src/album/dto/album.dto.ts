import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class IDAlbumParametr {
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  id: string;
}

export class NewAlbumParametr {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsOptional()
  @IsUUID()
  artistId?: string;
  @IsNumber()
  @IsNotEmpty()
  year: number;
}

export class UpdateAlbumParametr {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsOptional()
  @IsUUID()
  artistId?: string;
  @IsNumber()
  @IsNotEmpty()
  year: number;
}
