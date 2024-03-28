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
  champion: Champion;
  date: Date;
}

export type Champion = {
  id: number;
  name: string;
  description?: string;
}


