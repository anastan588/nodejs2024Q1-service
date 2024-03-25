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
  async addTrackToFavourites(@Param() trackToAddFav: IDFavParametr) {
    console.log('add track to Favourites');
    console.log(trackToAddFav);
    if (!this.uuidRegex.test(trackToAddFav.id)) {
      throw new HttpException('Track with invalid id', HttpStatus.BAD_REQUEST);
    }
    const track = await this.favService.addTrackToFav(trackToAddFav.id);
    console.log(track);
    return track;
  }
  @Post('/album/:id')
  @HttpCode(HttpStatus.CREATED)
  async addAlbumToFavourites(@Param() albumToAddFav: IDFavParametr) {
    console.log('add album to Favourites');
    console.log(albumToAddFav);
    if (!this.uuidRegex.test(albumToAddFav.id)) {
      throw new HttpException('Album with invalid id', HttpStatus.BAD_REQUEST);
    }
    const album = await this.favService.addAlbumToFav(albumToAddFav.id);
    console.log(album);
    return album;
  }
  @Post('/artist/:id')
  @HttpCode(HttpStatus.CREATED)
  async addArtistToFavourites(@Param() artstToAddFav: IDFavParametr) {
    console.log('add artist to Favourites');
    console.log(artstToAddFav);
    if (!this.uuidRegex.test(artstToAddFav.id)) {
      throw new HttpException('Artist with invalid id', HttpStatus.BAD_REQUEST);
    }
    const artist = await this.favService.addArtistToFav(artstToAddFav.id);
    console.log(artist);
    return artist;
  }
  @Delete('/track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTrackFromFavouites(@Param() trackToDeleteFromFav: IDFavParametr) {
    console.log('delete Track from Favourites');
    console.log(trackToDeleteFromFav.id);
    if (!this.uuidRegex.test(trackToDeleteFromFav.id)) {
      throw new HttpException('Track with invalid id', HttpStatus.BAD_REQUEST);
    }
    const trackID = await this.favService.deleteTrackFromFav(
      trackToDeleteFromFav.id,
    );
    return trackID;
  }

  @Delete('/album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAlbumFromFavourites(
    @Param() albumToDeleteFromFav: IDFavParametr,
  ) {
    console.log('delete Album from Favourites');
    console.log(albumToDeleteFromFav.id);
    if (!this.uuidRegex.test(albumToDeleteFromFav.id)) {
      throw new HttpException('Album with invalid id', HttpStatus.BAD_REQUEST);
    }
    const albumID = await this.favService.deleteAlbumFromFav(
      albumToDeleteFromFav.id,
    );
    return albumID;
  }
  @Delete('/artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteArtistFromFavourites(
    @Param() artistToDeleteFromFav: IDFavParametr,
  ) {
    console.log('delete Artist from Favourites');
    console.log(artistToDeleteFromFav.id);
    if (!this.uuidRegex.test(artistToDeleteFromFav.id)) {
      throw new HttpException('Artist with invalid id', HttpStatus.BAD_REQUEST);
    }
    const artistID = await this.favService.deleteArtistFromFav(
      artistToDeleteFromFav.id,
    );
    return artistID;
  }
}
