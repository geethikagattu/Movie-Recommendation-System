// src/components/MoodRecommendations.jsx
import { useState, useEffect } from 'react';
import '../css/MoodRecommendations.css';
import MovieCard from './MovieCard';

const moodGenreMap = {
  happy: ['comedy', '35', 'family', '10751', 'animation', '16'],
  sad: ['drama', '18', 'romance', '10749'],
  excited: ['action', '28', 'adventure', '12', 'science fiction', '878'],
  relaxed: ['documentary', '99', 'music', '10402'],
  scared: ['horror', '27', 'thriller', '53'],
  thoughtful: ['mystery', '9648', 'history', '36', 'war', '10752']
};

const genreIds = {
  action: '28',
  adventure: '12',
  animation: '16',
  comedy: '35',
  crime: '80',
  documentary: '99',
  drama: '18',
  family: '10751',
  fantasy: '14',
  history: '36',
  horror: '27',
  music: '10402',
  mystery: '9648',
  romance: '10749',
  'science fiction': '878',
  'tv movie': '10770',
  thriller: '53',
  war: '10752',
  western: '37'
};

function MoodRecommendations() {
  const [mood, setMood] = useState('');
  const [genre, setGenre] = useState('');
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recommendationMade, setRecommendationMade] = useState(false);

  const handleMoodChange = (selectedMood) => {
    setMood(selectedMood);
    setGenre(''); // Reset genre when mood changes
  };

  const handleGenreChange = (e) => {
    setGenre(e.target.value);
  };

  const fetchRecommendedMovies = async () => {
    setLoading(true);
    setRecommendationMade(true);
    
    try {
      let genreParam = genre;
      
      // If no specific genre is selected, randomly choose one from the mood's genres
      if (!genre && mood) {
        const moodGenres = moodGenreMap[mood] || [];
        if (moodGenres.length > 0) {
          // Pick a random genre ID from the mood's genres (every other item in the array is an ID)
          const genreIds = moodGenres.filter((_, index) => index % 2 !== 0);
          genreParam = genreIds[Math.floor(Math.random() * genreIds.length)];
        }
      }

      const API_KEY = "2e853e239a10686485ea5d598515cf2d";
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreParam}&sort_by=popularity.desc`
      );
      
      const data = await response.json();
      
      // Get 4 random movies from the results
      const shuffled = data.results.sort(() => 0.5 - Math.random());
      setRecommendedMovies(shuffled.slice(0, 4));
    } catch (error) {
      console.error("Error fetching recommended movies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // If both mood and genre are selected, fetch recommendations
    if ((mood && genre) || (mood && !genre && moodGenreMap[mood])) {
      fetchRecommendedMovies();
    }
  }, [mood, genre]);

  return (
    <div className="mood-recommendations">
      <h2>Movie Mood Matcher</h2>
      <p className="subtitle">Find the perfect movie based on how you're feeling right now</p>
      
      <div className="mood-selector">
        <h3>How are you feeling today?</h3>
        <div className="mood-buttons">
          <button 
            className={`mood-button ${mood === 'happy' ? 'active' : ''}`}
            onClick={() => handleMoodChange('happy')}
          >
            😊 Happy
          </button>
          <button 
            className={`mood-button ${mood === 'sad' ? 'active' : ''}`}
            onClick={() => handleMoodChange('sad')}
          >
            😢 Sad
          </button>
          <button 
            className={`mood-button ${mood === 'excited' ? 'active' : ''}`}
            onClick={() => handleMoodChange('excited')}
          >
            🤩 Excited
          </button>
          <button 
            className={`mood-button ${mood === 'relaxed' ? 'active' : ''}`}
            onClick={() => handleMoodChange('relaxed')}
          >
            😌 Relaxed
          </button>
          <button 
            className={`mood-button ${mood === 'scared' ? 'active' : ''}`}
            onClick={() => handleMoodChange('scared')}
          >
            😱 Scared
          </button>
          <button 
            className={`mood-button ${mood === 'thoughtful' ? 'active' : ''}`}
            onClick={() => handleMoodChange('thoughtful')}
          >
            🤔 Thoughtful
          </button>
        </div>
      </div>

      {mood && (
        <div className="genre-selector">
          <h3>Choose a specific genre (optional)</h3>
          <select 
            value={genre} 
            onChange={handleGenreChange}
            className="genre-dropdown"
          >
            <option value="">Let us surprise you</option>
            {moodGenreMap[mood]?.filter((_, index) => index % 2 === 0).map((genreName, index) => (
              <option key={index} value={moodGenreMap[mood][index * 2 + 1]}>
                {genreName.charAt(0).toUpperCase() + genreName.slice(1)}
              </option>
            ))}
          </select>
        </div>
      )}

      {loading ? (
        <div className="recommendations-loading">Finding perfect movies for you...</div>
      ) : recommendationMade && recommendedMovies.length > 0 ? (
        <div className="recommendations-container">
          <h3>Your Personalized Recommendations</h3>
          <div className="recommendations-grid">
            {recommendedMovies.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
          <button 
            className="refresh-button"
            onClick={fetchRecommendedMovies}
          >
            Show me more movies
          </button>
        </div>
      ) : recommendationMade ? (
        <div className="no-recommendations">
          <p>No movies found for your criteria. Try a different mood or genre.</p>
        </div>
      ) : null}
    </div>
  );
}

export default MoodRecommendations;