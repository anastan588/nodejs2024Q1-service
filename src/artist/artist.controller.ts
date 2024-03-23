import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import {
  IDArtistParametr,
  NewAtristParametr,
  UpdateAtristParametr,
} from './dto/artist.dto';

@Controller('artist')
export class ArtistController {
  uuidRegex: RegExp;
  constructor(private artistService: ArtistService) {
    this.uuidRegex =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
  }
  @Get()
  getAllTracks() {
    console.log('get artists');
    return this.artistService.getAllArtists();
  }
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getTrackById(@Param() artistToFind: IDArtistParametr) {
    console.log('get artist By Id');
    console.log(artistToFind.id);
    if (!this.uuidRegex.test(artistToFind.id)) {
      throw new HttpException('Artist with invalid id', HttpStatus.BAD_REQUEST);
    }
    const artist = this.artistService.getArtistByID(artistToFind.id);
    return artist;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createTrack(@Body() newArtist: NewAtristParametr) {
    console.log(newArtist);
    if (
      Object.keys(newArtist).length === 0 ||
      newArtist.grammy === undefined ||
      newArtist.name === undefined ||
      newArtist.grammy === null ||
      newArtist.name === null
    ) {
      throw new HttpException('Artist data invalid', HttpStatus.BAD_REQUEST);
    }
    console.log('create New Artist');
    const artist = this.artistService.createArtist(newArtist);
    return artist;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTrack(@Param() artistToDelete: IDArtistParametr) {
    console.log('delete Artist ById');
    console.log(artistToDelete.id);
    if (!this.uuidRegex.test(artistToDelete.id)) {
      throw new HttpException('Artist with invalid id', HttpStatus.BAD_REQUEST);
    }
    const artistID = this.artistService.deleteArtist(artistToDelete.id);
    return artistID;
  }

  @Put(':id')
  updateArtistInfo(
    @Param() artistToUpdate: IDArtistParametr,
    @Body() updateArtist: UpdateAtristParametr,
  ) {
    console.log('update Artist');
    console.log(artistToUpdate);
    console.log(updateArtist);
    if (
      Object.keys(updateArtist).length === 0 ||
      updateArtist.name === null ||
      updateArtist.grammy === null ||
      typeof updateArtist.grammy !== 'boolean'
    ) {
      throw new HttpException(
        'Update artist data invalid',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!this.uuidRegex.test(artistToUpdate.id)) {
      throw new HttpException('Artist with invalid id', HttpStatus.BAD_REQUEST);
    }
    const artist = this.artistService.updateArtist(
      artistToUpdate.id,
      updateArtist,
    );
    return artist;
  }
}
