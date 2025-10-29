import { MovieDetails } from "@/interfaces/interfaces";

export const OMDB_CONFIG = {
  BASE_URL: "https://www.omdbapi.com/",

  API_KEY: process.env.OMDB_API_KEY,
  // Headers: {
  //     accept: 'application/json',
  //     Authorization: `Bearer ${process.env.OMDB_API_KEY}`
  // }
}

const randomKeywords = ["spider", "batman", "avengers", "superman", "joker", "inception", "matrix"];

export const fetchMovies = async ({ query }: { query: string }) => {
  // console.log(OMDB_CONFIG.API_KEY);
  const keyword = randomKeywords[Math.floor(Math.random() * randomKeywords.length)];

  const endpoint = query
    ? `${OMDB_CONFIG.BASE_URL}?apikey=${OMDB_CONFIG.API_KEY}&s=${encodeURIComponent(query)}`
    : `${OMDB_CONFIG.BASE_URL}?apikey=${OMDB_CONFIG.API_KEY}&s=${keyword}`;

  const response = await fetch(endpoint, {
    method: 'GET',
    headers: {
      Accept: "application/json",
    },
    // headers: {
    //     Accept: 'application/json',
    //     Authorization: `Bearer ${OMDB_CONFIG.API_KEY}`,
    // },
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.statusText}`);
  }
  const data = await response.json();
  // console.log("OMDb API response:", data);

  // ✅ OMDb returns results inside 'Search'
  const results = data.Search || [];
  return results;

}


// cmksc
export const fetchMovieDetails = async (imdbID: string): Promise<MovieDetails> => {
  try {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${OMDB_CONFIG.API_KEY}&i=${imdbID}&plot=full`);
    if(!response.ok) throw new Error("Failed to load movie details");
    const data = await response.json() as MovieDetails;
    return data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error ;
  }
};

