import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Artist } from 'src/database/database.types';
import { NewAtristParametr, UpdateAtristParametr } from './dto/artist.dto';
import { v4 } from 'uuid';

@Injectable()
export class ArtistService {
  constructor(private database: DatabaseService) {}
  getAllArtists() {
    return this.database.artists;
  }
  getArtistByID(id: string): Artist {
    const artist = this.database.artists.find((artist) => artist.id === id);
    return artist;
  }
  createArtist(createArtist: NewAtristParametr): Artist {
    const newArtist: Artist = {
      id: v4(),
      grammy: createArtist.grammy,
      name: createArtist.name,
    };
    this.database.artists.push(newArtist);
    return newArtist;
  }
  deleteArtist(id: string) {
    const artistID = this.database.artists.findIndex(
      (artist) => artist.id === id,
    );
    this.database.artists.splice(artistID, 1);
    this.database.tracks.forEach((track) => {
      if (track.artistId === id) {
        track.artistId = null;
      }
    });
    this.database.albums.forEach((album) => {
      if (album.artistId === id) {
        album.artistId = null;
      }
    });
    return artistID;
  }
  updateArtist(id: string, updateArtist: UpdateAtristParametr): Artist {
    const artist = this.database.artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
    artist.name = updateArtist.name;
    artist.grammy = updateArtist.grammy;
    return artist;
  }
}
