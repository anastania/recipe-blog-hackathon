import React from 'react';
import PostCard from './PostCard';
import SearchBar from './SearchBar';
import Pagination from './Pagination';

function BlogGrid({ 
  posts, 
  loading, 
  searchTerm, 
  selectedTags, 
  pagination, 
  onSearch, 
  onTagFilter, 
  onPageChange,
  onEdit,
  onDelete 
}) {
  return (
    <main style={{ 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: '2rem' 
    }}>
      <SearchBar 
        searchTerm={searchTerm}
        selectedTags={selectedTags}
        onSearch={onSearch}
        onTagFilter={onTagFilter}
      />
      
      <div style={{ margin: '1rem 0', color: '#666' }}>
        {loading ? 'Chargement...' : 
         `${pagination.totalPosts || 0} recette(s) trouvée(s)`}
      </div>
      
      {loading ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>Chargement des recettes...</p>
        </div>
      ) : posts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>Aucune recette trouvée. Créez la première ! 🍳</p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '2rem',
          margin: '2rem 0'
        }}>
          {posts.map(post => (
            <PostCard 
              key={post._id} 
              post={post}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
      
      {pagination.totalPages > 1 && (
        <Pagination 
          pagination={pagination}
          onPageChange={onPageChange}
        />
      )}
    </main>
  );
}

export default BlogGrid;