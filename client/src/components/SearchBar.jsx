import React, { useState } from 'react';

function SearchBar({ searchTerm, selectedTags, onSearch, onTagFilter }) {
  const [localSearch, setLocalSearch] = useState(searchTerm);
  const [localTags, setLocalTags] = useState(selectedTags);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(localSearch);
  };

  const clearFilters = () => {
    setLocalSearch('');
    setLocalTags('');
    onSearch('');
    onTagFilter('');
  };

  return (
    <div style={{
      backgroundColor: '#f8f9fa',
      padding: '1.5rem',
      borderRadius: '8px',
      marginBottom: '2rem'
    }}>
      <h3 style={{ margin: '0 0 1rem 0', color: '#2c3e50' }}>
        Rechercher des recettes
      </h3>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr auto', 
        gap: '1rem',
        alignItems: 'end'
      }}>
        <form onSubmit={handleSearchSubmit}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Recherche
          </label>
          <input
            type="text"
            placeholder="Ex: pâtes, poulet, rapide..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '1rem'
            }}
          />
        </form>
        
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Tags (séparés par des virgules)
          </label>
          <input
            type="text"
            placeholder="Ex: italien, rapide, végétarien"
            value={localTags}
            onChange={(e) => setLocalTags(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '1rem'
            }}
          />
        </div>
        
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => {
              onSearch(localSearch);
              onTagFilter(localTags);
            }}
            style={{
              backgroundColor: '#27ae60',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1rem',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Filtrer
          </button>
          
          <button
            onClick={clearFilters}
            style={{
              backgroundColor: '#95a5a6',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1rem',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;