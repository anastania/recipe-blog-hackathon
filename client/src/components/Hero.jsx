import React from 'react';

function Hero({ onCreateClick }) {
  return (
    <section style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: '4rem 2rem',
      textAlign: 'center'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ 
          fontSize: '3rem', 
          margin: '0 0 1rem 0',
          fontWeight: 'bold'
        }}>
          Cuisinez délicieux en 30 minutes ! 
        </h2>
        
        <p style={{ 
          fontSize: '1.2rem', 
          margin: '0 0 2rem 0',
          opacity: 0.9
        }}>
          Découvrez des recettes rapides et savoureuses pour les gens occupés. 
          Partagez vos propres créations culinaires !
        </p>
        
        <button
          onClick={onCreateClick}
          style={{
            backgroundColor: '#e74c3c',
            color: 'white',
            border: 'none',
            padding: '1rem 2rem',
            fontSize: '1.1rem',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
          }}
        >
          Partager ma recette 
        </button>
      </div>
    </section>
  );
}

export default Hero;