import React from 'react';

function PostCard({ post, onEdit, onDelete }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const truncateContent = (content, maxLength = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <article style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      overflow: 'hidden',
      backgroundColor: 'white',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div style={{ padding: '1.5rem' }}>
        <h3 style={{ 
          margin: '0 0 0.5rem 0',
          fontSize: '1.3rem',
          color: '#2c3e50'
        }}>
          {post.title}
        </h3>
        
        <div style={{ 
          fontSize: '0.9rem', 
          color: '#666', 
          marginBottom: '1rem' 
        }}>
          {formatDate(post.createdAt)} • {post.difficulty} • {post.cookingTime}
        </div>
        
        <p style={{ 
          color: '#555', 
          lineHeight: '1.5',
          marginBottom: '1rem'
        }}>
          {truncateContent(post.content.replace(/[#*]/g, ''))}
        </p>
        
        {post.tags && post.tags.length > 0 && (
          <div style={{ marginBottom: '1rem' }}>
            {post.tags.map(tag => (
              <span 
                key={tag}
                style={{
                  display: 'inline-block',
                  backgroundColor: '#ecf0f1',
                  color: '#2c3e50',
                  padding: '0.2rem 0.5rem',
                  borderRadius: '12px',
                  fontSize: '0.8rem',
                  margin: '0.2rem 0.3rem 0.2rem 0'
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
        
        <div style={{ 
          display: 'flex', 
          gap: '0.5rem',
          marginTop: '1rem'
        }}>
          <button
            onClick={() => onEdit(post)}
            style={{
              backgroundColor: '#3498db',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}
          >
            Modifier
          </button>
          
          <button
            onClick={() => onDelete(post._id)}
            style={{
              backgroundColor: '#e74c3c',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}
          >
            Supprimer
          </button>
        </div>
      </div>
    </article>
  );
}

export default PostCard;