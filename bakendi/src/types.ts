export type User = {
  id: number;
  name: string;
  slug: string;
  description?: string;
}

export type Game = {
  id: number;
  kill: number;
  assists: number;
  deaths: number;
  champion: string;
  user: number;
  date: Date;
  wol: boolean;
}

export type Champion = {
  id: number;
  name: string;
  description?: string;
}


