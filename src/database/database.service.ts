import { Global, Injectable } from '@nestjs/common';
import { Album, Artist, Favorite, Track, User } from './database.types';

@Global()
@Injectable()
export class DatabaseService {
  users: User[] = [];
  tracks: Track[] = [];
  artists: Artist[] = [];
  albums: Album[] = [];
  favorites: Favorite = {
    artists: [],
    albums: [],
    tracks: [],
  };
}
