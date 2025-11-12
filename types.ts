
export interface GamePrice {
  final: number | null;
  currency: string;
  discountPercent: number | null;
  isFree: boolean;
}

export interface Game {
  appId: number;
  title: string;
  coverUrl: string;
  price: GamePrice;
  shortDescription: string;
  longDescription: string;
  screenshots: string[];
  movies: { name: string; thumbnail: string; webm: { "480": string; max: string } }[];
  tags: string[];
  genres: { id: string; description: string }[];
  releaseDate: string;
}

export interface UserLists {
  favorites: number[];
  played: number[];
  discarded: number[];
}

export type ListType = keyof UserLists;
