// types.ts (or wherever you store your interfaces)
export interface Movie {
  Poster: string;
  Title: string;
  Type?: "movie" | "series" | "episode"; // OMDb can return these types
  Year?: string;
  rating?: number;
  imdbID: string;
}


interface TrendingMovie {
  searchTerm: string;
  movie_id: number;
  title: string;
  count: number;
  poster: string;
}
export interface MovieDetails {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: {
    Source: string;
    Value: string;
  }[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

interface TrendingCardProps {
  movie: TrendingMovie;
  index: number;
}

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  bio?: string;
  joinedAt: string;
  stats: {
    moviesWatched: number;
    favorites: number;
    reviews: number;
  };
  watchlist: {
    id: string;
    title: string;
    poster: string;
    year: string;
    type: "movie" | "series" | "episode";
  }[];
}
