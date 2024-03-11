import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { FavsService } from './favs.service';
import { IDFavParametr } from './dto/fav.dto';

@Controller('favs')
export class FavsController {
  uuidRegex: RegExp;
  constructor(private favService: FavsService) {
    this.uuidRegex =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
  }
  @Get()
  getAllFavourites() {
    console.log('get favourites');
    return this.favService.getAllFavourites();
  }

  @Post('/track/:id')
  @HttpCode(HttpStatus.CREATED)
  addTrackToFavourites(@Param() trackToAddFav: IDFavParametr) {
    console.log('add track to Favourites');
    console.log(trackToAddFav);
    if (!this.uuidRegex.test(trackToAddFav.id)) {
      throw new HttpException('Track with invalid id', HttpStatus.BAD_REQUEST);
    }
    const track = this.favService.addTrackToFav(trackToAddFav.id);
    if (!track) {
      throw new HttpException(
        'Track not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return track;
  }
  @Post('/album/:id')
  @HttpCode(HttpStatus.CREATED)
  addAlbumToFavourites(@Param() albumToAddFav: IDFavParametr) {
    console.log('add album to Favourites');
    console.log(albumToAddFav);
    if (!this.uuidRegex.test(albumToAddFav.id)) {
      throw new HttpException('Album with invalid id', HttpStatus.BAD_REQUEST);
    }
    const album = this.favService.addAlbumToFav(albumToAddFav.id);
    if (!album) {
      throw new HttpException(
        'Album not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return album;
  }
  @Post('/artist/:id')
  @HttpCode(HttpStatus.CREATED)
  addArtistToFavourites(@Param() artstToAddFav: IDFavParametr) {
    console.log('add artist to Favourites');
    console.log(artstToAddFav);
    if (!this.uuidRegex.test(artstToAddFav.id)) {
      throw new HttpException('Artist with invalid id', HttpStatus.BAD_REQUEST);
    }
    const artist = this.favService.addArtistToFav(artstToAddFav.id);
    if (!artist) {
      throw new HttpException(
        'Artist not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return artist;
  }
  @Delete('/track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTrackFromFavouites(@Param() trackToDeleteFromFav: IDFavParametr) {
    console.log('delete Track from Favourites');
    console.log(trackToDeleteFromFav.id);
    if (!this.uuidRegex.test(trackToDeleteFromFav.id)) {
      throw new HttpException('Track with invalid id', HttpStatus.BAD_REQUEST);
    }
    const trackID = this.favService.deleteTrackFromFav(trackToDeleteFromFav.id);
    if (trackID === -1) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }
    return trackID;
  }

  @Delete('/album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteAlbumFromFavourites(@Param() albumToDeleteFromFav: IDFavParametr) {
    console.log('delete Album from Favourites');
    console.log(albumToDeleteFromFav.id);
    if (!this.uuidRegex.test(albumToDeleteFromFav.id)) {
      throw new HttpException('Album with invalid id', HttpStatus.BAD_REQUEST);
    }
    const albumID = this.favService.deleteAlbumFromFav(albumToDeleteFromFav.id);
    if (albumID === -1) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
    return albumID;
  }
  @Delete('/artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteArtistFromFavourites(@Param() artistToDeleteFromFav: IDFavParametr) {
    console.log('delete Artist from Favourites');
    console.log(artistToDeleteFromFav.id);
    if (!this.uuidRegex.test(artistToDeleteFromFav.id)) {
      throw new HttpException('Artist with invalid id', HttpStatus.BAD_REQUEST);
    }
    const artistID = this.favService.deleteArtistFromFav(
      artistToDeleteFromFav.id,
    );
    if (artistID === -1) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
    return artistID;
  }
}
