import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FavsService {
  constructor(private prisma: PrismaService) {}
  async getAllFavourites() {
    const favouritesDataIDs = await this.prisma.favorite.findFirst();
    let artists;
    let albums;
    let tracks;
    if (favouritesDataIDs === null) {
      artists = [];
      albums = [];
      tracks = [];
    } else {
      artists = await this.prisma.artist.findMany({
        where: {
          id: {
            in: favouritesDataIDs.artists,
          },
        },
      });
      albums = await this.prisma.album.findMany({
        where: {
          id: {
            in: favouritesDataIDs.albums,
          },
        },
      });
      tracks = await this.prisma.track.findMany({
        where: {
          id: {
            in: favouritesDataIDs.tracks,
          },
        },
      });
    }
    const favorites = {
      tracks: await tracks,
      artists: await artists,
      albums: await albums,
    };
    return favorites;
  }

  async addTrackToFav(id: string) {
    const track = await this.prisma.track.findUnique({
      where: {
        id,
      },
    });
    if (!track) {
      throw new HttpException(
        'Track not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    if (track) {
      await this.prisma.favorite.upsert({
        where: { id: 1 },
        update: {
          tracks: {
            push: track.id,
          },
        },
        create: {
          id: 1,
        },
      });
    }
    return track;
  }

  async addAlbumToFav(id: string) {
    const album = await this.prisma.album.findUnique({
      where: {
        id,
      },
    });
    if (!album) {
      throw new HttpException(
        'Album not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    await this.prisma.favorite.upsert({
      where: { id: 1 },
      update: {
        albums: {
          push: album.id,
        },
      },
      create: {
        id: 1,
      },
    });
    return album;
  }

  async addArtistToFav(id: string) {
    const artist = await this.prisma.artist.findUnique({
      where: {
        id,
      },
    });
    if (!artist) {
      throw new HttpException(
        'Artist not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    if (artist) {
      await this.prisma.favorite.upsert({
        where: { id: 1 },
        update: {
          artists: {
            push: artist.id,
          },
        },
        create: {
          id: 1,
        },
      });
    }
    return artist;
  }
  async deleteTrackFromFav(id: string) {
    const favTracks = await this.prisma.favorite.findFirst({
      select: {
        tracks: true,
      },
    });
    const trackID = favTracks.tracks.findIndex((track) => track === id);
    if (trackID === -1) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }
    if (trackID !== -1) {
      favTracks.tracks.splice(trackID, 1);
      await this.prisma.favorite.update({
        where: { id: 1 },
        data: {
          tracks: favTracks.tracks,
        },
      });
    }
    return trackID;
  }
  async deleteAlbumFromFav(id: string) {
    const favAlbums = await this.prisma.favorite.findFirst({
      select: {
        albums: true,
      },
    });
    const albumID = favAlbums.albums.findIndex((album) => album === id);
    if (albumID === -1) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
    if (albumID !== -1) {
      favAlbums.albums.splice(albumID, 1);
      await this.prisma.favorite.update({
        where: { id: 1 },
        data: {
          albums: favAlbums.albums,
        },
      });
    }
    return albumID;
  }
  async deleteArtistFromFav(id: string) {
    const favArtists = await this.prisma.favorite.findFirst({
      select: {
        artists: true,
      },
    });
    const artistID = favArtists.artists.findIndex((artist) => artist === id);
    if (artistID === -1) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
    if (artistID !== -1) {
      favArtists.artists.splice(artistID, 1);
      await this.prisma.favorite.update({
        where: { id: 1 },
        data: {
          artists: favArtists.artists,
        },
      });
    }
    return artistID;
  }
}
