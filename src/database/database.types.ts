export interface User {
  id: string; // uuid v4
  login: string;
  password: string;
  version: number; // integer number, increments on update
  createdAt: string; // timestamp of creation
  updatedAt: string; // timestamp of last update
}

export interface Artist {
  id: string; // uuid v4in
  name: string;
  grammy: boolean;
}

export interface Track {
  id: string; // uuid v4
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number; // integer number
}

export interface Album {
  id: string; // uuid v4
  name: string;
  year: number;
  artistId: string | null; // refers to Artist
}

export interface Favorite {
  artists: Artist[]; // favorite artists ids;
  albums: Album[]; // favorite albums ids
  tracks: Track[]; // favorite tracks ids
}

export class LoginDto {
  username: string;
  password: string;
}
