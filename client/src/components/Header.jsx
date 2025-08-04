import React from 'react';

function Header({ currentPage, setCurrentPage, setEditingPost }) {
  return (
    <header style={{ 
      backgroundColor: '#2c3e50', 
      color: 'white', 
      padding: '1rem 2rem',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <h1 
          onClick={() => setCurrentPage('home')}
          style={{ 
            margin: 0, 
            cursor: 'pointer',
            fontSize: '1.8rem'
          }}
        >
           RecettesExpress
        </h1>
        
        <nav>
          <button
            onClick={() => setCurrentPage('home')}
            style={{
              background: currentPage === 'home' ? '#34495e' : 'transparent',
              border: '1px solid white',
              color: 'white',
              padding: '0.5rem 1rem',
              margin: '0 0.5rem',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Accueil
          </button>
          
          <button
            onClick={() => {
              setEditingPost(null);
              setCurrentPage('editor');
            }}
            style={{
              background: currentPage === 'editor' ? '#34495e' : 'transparent',
              border: '1px solid white',
              color: 'white',
              padding: '0.5rem 1rem',
              margin: '0 0.5rem',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Nouvelle Recette
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;