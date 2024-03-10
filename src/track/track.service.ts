import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Track } from 'src/database/database.types';
import { NewTrackParametr, UpdateTrackParametr } from './dto/track.dto';
import { v4 } from 'uuid';

@Injectable()
export class TrackService {
  constructor(private database: DatabaseService) {}

  getAllTracks() {
    return this.database.users;
  }

  getTrackByID(id: string): Track {
    const track = this.database.tracks.find((track) => track.id === id);
    return track;
  }

  createTrack(createTrack: NewTrackParametr): Track {
    const newTrack: Track = {
      id: v4(),
      albumId: createTrack.albumId ? createTrack.albumId : null,
      artistId: createTrack.artistId ? createTrack.artistId : null,
      duration: createTrack.duration,
      name: createTrack.name,
    };
    this.database.tracks.push(newTrack);
    return newTrack;
  }

  deleteTrack(id: string) {
    const trackID = this.database.tracks.findIndex((track) => track.id === id);
    this.database.tracks.splice(trackID, 1);
    return trackID;
  }

  updateTrack(id: string, updateTrack: UpdateTrackParametr): Track {
    const track = this.database.tracks.find((track) => track.id === id);
    if (!track) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }
    track.albumId = updateTrack.albumId ? updateTrack.albumId : null;
    track.artistId = updateTrack.artistId ? updateTrack.artistId : null;
    track.duration = updateTrack.duration;
    track.name = updateTrack.name;
    return track;
  }
}
