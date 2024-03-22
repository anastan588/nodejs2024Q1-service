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
import { AlbumService } from './album.service';
import {
  IDAlbumParametr,
  NewAlbumParametr,
  UpdateAlbumParametr,
} from './dto/album.dto';

@Controller('album')
export class AlbumController {
  uuidRegex: RegExp;
  constructor(private albumService: AlbumService) {
    this.uuidRegex =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
  }
  @Get()
  getAllAlbums() {
    console.log('get albums');
    return this.albumService.getAllAlbums();
  }
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getTrackById(@Param() albumToFind: IDAlbumParametr) {
    console.log('get album By Id');
    console.log(albumToFind.id);
    if (!this.uuidRegex.test(albumToFind.id)) {
      throw new HttpException('Album with invalid id', HttpStatus.BAD_REQUEST);
    }
    const album = this.albumService.getAlbumByID(albumToFind.id);
    return album;
  }
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createTrack(@Body() newAlbum: NewAlbumParametr) {
    if (
      Object.keys(newAlbum).length === 0 ||
      newAlbum.year === undefined ||
      newAlbum.name === undefined ||
      newAlbum.year === null ||
      newAlbum.name === null
    ) {
      throw new HttpException('Album data invalid', HttpStatus.BAD_REQUEST);
    }
    console.log('create New Album');
    console.log(newAlbum);
    const album = await this.albumService.createAlbum(newAlbum);
    return album;
  }
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTrack(@Param() albumToDelete: IDAlbumParametr) {
    console.log('delete Album ById');
    console.log(albumToDelete.id);
    if (!this.uuidRegex.test(albumToDelete.id)) {
      throw new HttpException('Album with invalid id', HttpStatus.BAD_REQUEST);
    }
    const albumID = this.albumService.deleteAlbum(albumToDelete.id);
    return albumID;
  }
  @Put(':id')
  async updateAlbumInfo(
    @Param() albumToUpdate: IDAlbumParametr,
    @Body() updateAlbum: UpdateAlbumParametr,
  ) {
    console.log('update Album');
    console.log(albumToUpdate);
    console.log(updateAlbum);
    if (
      Object.keys(updateAlbum).length === 0 ||
      updateAlbum.name === null ||
      updateAlbum.year === null ||
      typeof updateAlbum.year !== 'number' ||
      typeof updateAlbum.name !== 'string'
    ) {
      throw new HttpException(
        'Update album data invalid',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!this.uuidRegex.test(albumToUpdate.id)) {
      throw new HttpException('Album with invalid id', HttpStatus.BAD_REQUEST);
    }
    const album = await this.albumService.updateAlbum(
      albumToUpdate.id,
      updateAlbum,
    );
    return album;
  }
}
