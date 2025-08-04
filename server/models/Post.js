const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Le titre est obligatoire'],
    trim: true,
    maxlength: [200, 'Le titre ne peut pas dépasser 200 caractères']
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  content: {
    type: String,
    required: [true, 'Le contenu est obligatoire'],
    minlength: [50, 'Le contenu doit faire au moins 50 caractères']
  },
  tags: [{
    type: String,
    lowercase: true,
    trim: true
  }],
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft'
  },
  cookingTime: {
    type: String,
    default: '30min'
  },
  difficulty: {
    type: String,
    enum: ['facile', 'moyen', 'difficile'],
    default: 'facile'
  }
}, {
  timestamps: true
});

// Index pour la recherche
postSchema.index({ title: 'text', content: 'text' });
postSchema.index({ status: 1, createdAt: -1 });
postSchema.index({ tags: 1 });

module.exports = mongoose.model('Post', postSchema);