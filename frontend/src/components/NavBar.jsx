import { Link, useNavigate } from "react-router-dom";
import "../css/Navbar.css";
import { useState } from "react";
import logo from "../images/movieicon.png"; // Adjust path as needed

function NavBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    // Navigate to home page with search query as URL parameter
    navigate(`/?search=${encodeURIComponent(searchQuery)}`);
    
    // Optional: clear the search input after submitting
    // setSearchQuery("");
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">
          <img src={logo} alt="Movie App Logo" className="navbar-logo" />
        </Link>
      </div>
      
      <form onSubmit={handleSearch} className="navbar-search">
        <input
          type="text"
          placeholder="Search for movies..."
          className="navbar-search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="navbar-search-button">
          Search
        </button>
      </form>
      
      <div className="navbar-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/favorites" className="nav-link">Favorites</Link>
      </div>
    </nav>
  );
}

export default NavBar;