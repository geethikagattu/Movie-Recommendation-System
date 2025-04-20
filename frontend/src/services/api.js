const API_KEY = "2e853e239a10686485ea5d598515cf2d";
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async (page = 1) => {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`);
  const data = await response.json();
  return {
    results: data.results,
    page: data.page,
    total_pages: data.total_pages,
    total_results: data.total_results
  };
};

export const searchMovies = async (query, page = 1) => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`
  );
  const data = await response.json();
  return {
    results: data.results,
    page: data.page,
    total_pages: data.total_pages,
    total_results: data.total_results
  };
};