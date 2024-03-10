import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class IDTrackParametr {
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  id: string;
}

export class NewTrackParametr {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsOptional()
  @IsUUID()
  artistId?: string;
  @IsOptional()
  @IsUUID()
  albumId?: string;
  @IsNumber()
  @IsNotEmpty()
  duration: number;
}

export class UpdateTrackParametr {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsOptional()
  @IsUUID()
  artistId?: string;
  @IsOptional()
  @IsUUID()
  albumId?: string;
  @IsNumber()
  @IsNotEmpty()
  duration: number;
}
