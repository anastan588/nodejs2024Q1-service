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
import { TrackService } from './track.service';
import {
  IDTrackParametr,
  NewTrackParametr,
  UpdateTrackParametr,
} from './dto/track.dto';

@Controller('track')
export class TrackController {
  uuidRegex: RegExp;
  constructor(private trackService: TrackService) {
    this.uuidRegex =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
  }
  @Get()
  getAllTracks() {
    console.log('get tracks');
    return this.trackService.getAllTracks();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getTrackById(@Param() trackToFind: IDTrackParametr) {
    console.log('get track By Id');
    console.log(trackToFind.id);
    if (!this.uuidRegex.test(trackToFind.id)) {
      throw new HttpException('Track with invalid id', HttpStatus.BAD_REQUEST);
    }
    const track = this.trackService.getTrackByID(trackToFind.id);
    if (!track) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }
    return track;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createTrack(@Body() newTrack: NewTrackParametr) {
    console.log(newTrack);
    if (
      Object.keys(newTrack).length === 0 ||
      newTrack.duration === undefined ||
      newTrack.name === undefined ||
      newTrack.duration === null ||
      newTrack.name === null
    ) {
      throw new HttpException('Track data invalid', HttpStatus.BAD_REQUEST);
    }
    console.log('create New track');
    const track = this.trackService.createTrack(newTrack);
    return track;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTrack(@Param() trackToDelete: IDTrackParametr) {
    console.log('delete Track ById');
    console.log(trackToDelete.id);
    if (!this.uuidRegex.test(trackToDelete.id)) {
      throw new HttpException('Track with invalid id', HttpStatus.BAD_REQUEST);
    }
    const trackID = this.trackService.deleteTrack(trackToDelete.id);
    if (trackID === -1) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }
    return trackID;
  }

  @Put(':id')
  updateTrackInfo(
    @Param() trackToUpdate: IDTrackParametr,
    @Body() updateTrack: UpdateTrackParametr,
  ) {
    console.log('update Track');
    console.log(trackToUpdate);
    console.log(updateTrack);
    if (Object.keys(updateTrack).length === 0 || updateTrack.name === null) {
      throw new HttpException(
        'Update track data invalid',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!this.uuidRegex.test(trackToUpdate.id)) {
      throw new HttpException('Track with invalid id', HttpStatus.BAD_REQUEST);
    }
    const track = this.trackService.updateTrack(trackToUpdate.id, updateTrack);
    return track;
  }
}
