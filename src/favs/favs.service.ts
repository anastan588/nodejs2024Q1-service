import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class FavsService {
  constructor(private database: DatabaseService) {}
  getAllFavourites() {
    return this.database.favorites;
  }
  addTrackToFav(id: string) {
    const track = this.database.tracks.find((track) => track.id === id);
    if (track) {
      this.database.favorites.tracks.push(track);
    }
    return track;
  }
  addAlbumToFav(id: string) {
    const album = this.database.albums.find((album) => album.id === id);
    if (album) {
      this.database.favorites.albums.push(album);
    }
    return album;
  }
  addArtistToFav(id: string) {
    const artist = this.database.artists.find((artist) => artist.id === id);
    if (artist) {
      this.database.favorites.artists.push(artist);
    }
    return artist;
  }
  deleteTrackFromFav(id: string) {
    const trackID = this.database.favorites.tracks.findIndex(
      (track) => track.id === id,
    );
    if (trackID !== -1) {
      this.database.favorites.tracks.splice(trackID, 1);
    }
    return trackID;
  }
  deleteAlbumFromFav(id: string) {
    const albumID = this.database.favorites.albums.findIndex(
      (album) => album.id === id,
    );
    if (albumID !== -1) {
      this.database.favorites.albums.splice(albumID, 1);
    }
    return albumID;
  }
  deleteArtistFromFav(id: string) {
    console.log(this.database.favorites.artists);
    const artistID = this.database.favorites.artists.findIndex(
      (artist) => artist.id === id,
    );
    console.log(artistID);
    if (artistID !== -1) {
      this.database.favorites.artists.splice(artistID, 1);
    }
    console.log(this.database.favorites.artists);
    return artistID;
  }
}
