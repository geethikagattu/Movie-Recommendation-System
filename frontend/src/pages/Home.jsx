import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";
import MoodRecommendations from "../components/MoodRecommendations";
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies } from "../services/api";
import "../css/Home.css";
import { useLocation } from "react-router-dom";

function Home() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const location = useLocation();
  
  // Get search query from URL parameters
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search") || "";
  const isSearching = !!searchQuery;

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      try {
        if (isSearching) {
          const data = await searchMovies(searchQuery, page);
          setMovies(data.results);
          setTotalPages(Math.min(data.total_pages, 500)); // TMDB API limits to 500 pages
        } else {
          const data = await getPopularMovies(page);
          setMovies(data.results);
          setTotalPages(Math.min(data.total_pages, 500));
        }
        setError(null);
      } catch (err) {
        console.log(err);
        setError("Failed to load movies...");
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [page, isSearching, searchQuery]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo(0, 0); // Scroll back to top when changing pages
  };

  return (
    <div className="home">
      {/* Add Mood Recommendations component */}
      <MoodRecommendations />
      
      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
          <div className="results-info">
            {isSearching ? (
              <p>Search results for "{searchQuery}"</p>
            ) : (
              <p>Popular movies</p>
            )}
          </div>
          
          <div className="movies-grid">
            {movies.length > 0 ? (
              movies.map((movie) => (
                <MovieCard movie={movie} key={movie.id} />
              ))
            ) : (
              <div className="no-results">
                <p>No movies found. Try a different search term.</p>
              </div>
            )}
          </div>
          
          {movies.length > 0 && totalPages > 1 && (
            <Pagination 
              currentPage={page} 
              totalPages={totalPages} 
              onPageChange={handlePageChange} 
            />
          )}
        </>
      )}
    </div>
  );
}

export default Home;