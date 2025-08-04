import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import Hero from './components/Hero';
import BlogGrid from './components/BlogGrid';
import PostEditor from './components/PostEditor';
import Footer from './components/Footer';

const API_BASE_URL = 'http://localhost:4000/api';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState('');
  const [pagination, setPagination] = useState({});
  const [editingPost, setEditingPost] = useState(null);

  const fetchPosts = async (page = 1, search = '', tags = '') => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/posts`, {
        params: {
          page,
          limit: 6,
          search,
          tags,
          status: 'published'
        }
      });
      
      setPosts(response.data.posts);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error('Erreur chargement posts:', error);
      alert('Erreur lors du chargement des recettes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentPage === 'home') {
      fetchPosts(1, searchTerm, selectedTags);
    }
  }, [currentPage, searchTerm, selectedTags]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleTagFilter = (tags) => {
    setSelectedTags(tags);
  };

  const handlePageChange = (page) => {
    fetchPosts(page, searchTerm, selectedTags);
  };

  const handleSavePost = async (postData) => {
    try {
      if (editingPost) {
        await axios.put(`${API_BASE_URL}/posts/${editingPost._id}`, postData);
        alert('Recette modifiée avec succès !');
      } else {
        await axios.post(`${API_BASE_URL}/posts`, postData);
        alert('Recette créée avec succès !');
      }
      
      setCurrentPage('home');
      setEditingPost(null);
      fetchPosts();
    } catch (error) {
      console.error('Erreur sauvegarde:', error);
      alert('Erreur lors de la sauvegarde');
    }
  };

  const handleDeletePost = async (postId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette recette ?')) {
      try {
        await axios.delete(`${API_BASE_URL}/posts/${postId}`);
        alert('Recette supprimée !');
        fetchPosts();
      } catch (error) {
        console.error('Erreur suppression:', error);
        alert('Erreur lors de la suppression');
      }
    }
  };

  const handleEditPost = (post) => {
    setEditingPost(post);
    setCurrentPage('editor');
  };

  return (
    <div className="App">
      <Header 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setEditingPost={setEditingPost}
      />
      
      {currentPage === 'home' && (
        <>
          <Hero onCreateClick={() => setCurrentPage('editor')} />
          <BlogGrid 
            posts={posts}
            loading={loading}
            searchTerm={searchTerm}
            selectedTags={selectedTags}
            pagination={pagination}
            onSearch={handleSearch}
            onTagFilter={handleTagFilter}
            onPageChange={handlePageChange}
            onEdit={handleEditPost}
            onDelete={handleDeletePost}
          />
        </>
      )}
      
      {currentPage === 'editor' && (
        <PostEditor 
          post={editingPost}
          onSave={handleSavePost}
          onCancel={() => {
            setCurrentPage('home');
            setEditingPost(null);
          }}
        />
      )}
      
      <Footer />
    </div>
  );
}

export default App;