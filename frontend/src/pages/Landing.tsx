import React, { useState } from 'react';

const Landing = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    // Implement your search logic here
    // You can make an API call to retrieve recipes based on the searchQuery
  };

  return (
    <div className="recipe-search-page">
      <h1>Recipe Search</h1>
      <div className="search-bar">
        <input
          type="text"
          className="recipe-main-search"
          placeholder="Search for recipes"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="recipe-main-search-btn" onClick={handleSearch}>Search</button>
      </div>
      {/* Display the search results here */}
    </div>
  );
};

export default Landing;