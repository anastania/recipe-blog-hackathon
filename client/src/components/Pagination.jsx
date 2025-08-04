import React from 'react';

function Pagination({ pagination, onPageChange }) {
  const { currentPage, totalPages, hasPrev, hasNext } = pagination;

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      gap: '1rem',
      margin: '2rem 0'
    }}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPrev}
        style={{
          backgroundColor: hasPrev ? '#3498db' : '#bdc3c7',
          color: 'white',
          border: 'none',
          padding: '0.5rem 1rem',
          borderRadius: '4px',
          cursor: hasPrev ? 'pointer' : 'not-allowed'
        }}
      >
        ← Précédent
      </button>
      
      <span style={{ 
        fontSize: '1rem',
        color: '#2c3e50',
        fontWeight: 'bold'
      }}>
        Page {currentPage} sur {totalPages}
      </span>
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNext}
        style={{
          backgroundColor: hasNext ? '#3498db' : '#bdc3c7',
          color: 'white',
          border: 'none',
          padding: '0.5rem 1rem',
          borderRadius: '4px',
          cursor: hasNext ? 'pointer' : 'not-allowed'
        }}
      >
        Suivant →
      </button>
    </div>
  );
}

export default Pagination;