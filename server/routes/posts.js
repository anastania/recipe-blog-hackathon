const express = require("express");
const router = express.Router();

const Post = require("../models/Post");
const { generateUniqueSlug } = require("../utils/slugify");

// POST /api/posts - Créer
router.post("/", async (req, res) => {
  try {
    const { title, content, tags, status } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        message: "Le titre et le contenu sont obligatoires",
      });
    }

    const slug = await generateUniqueSlug(title);

    // Gestion flexible des tags (string ou array)
    const processedTags = Array.isArray(tags)
      ? tags.map((tag) => tag.trim().toLowerCase())
      : typeof tags === "string"
      ? tags
          .split(",")
          .map((tag) => tag.trim().toLowerCase())
          .filter((tag) => tag)
      : [];

    const newPost = new Post({
      title: title.trim(),
      slug,
      content: content.trim(),
      tags: processedTags,
      status: status || "draft",
    });

    const savedPost = await newPost.save();

    res.status(201).json({
      message: "Recette créée !",
      post: savedPost,
    });
  } catch (error) {
    console.error("Erreur POST:", error);
    res.status(500).json({ message: "Erreur création", error: error.message });
  }
});

// PUT /api/posts/:id - Modifier
router.put("/:id", async (req, res) => {
  try {
    const { title, content, tags, status } = req.body;

    // Gestion flexible des tags (string ou array)
    const processedTags = Array.isArray(tags)
      ? tags.map((tag) => tag.trim().toLowerCase())
      : typeof tags === "string"
      ? tags.split(",").map((tag) => tag.trim().toLowerCase())
      : undefined;

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      {
        title: title?.trim(),
        content: content?.trim(),
        tags: processedTags,
        status: status,
      },
      { new: true, runValidators: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: "Recette non trouvée" });
    }

    res.json({ message: "Recette mise à jour !", post: updatedPost });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur mise à jour", error: error.message });
  }
});

// DELETE /api/posts/:id - Supprimer
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Recette non trouvée" });
    }

    res.json({ message: "Recette supprimée !" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur suppression", error: error.message });
  }
});

// GET /api/posts - Liste avec filtres
router.get("/", async (req, res) => {
  try {
    const {
      status = "published",
      page = 1,
      limit = 6,
      search = "",
      tags = "",
    } = req.query;

    const filter = {};

    if (status !== "all") {
      filter.status = status;
    }

    if (search) {
      filter.$text = { $search: search };
    }

    if (tags) {
      const tagArray = tags
        .split(",")
        .map((tag) => tag.trim().toLowerCase());
      filter.tags = { $in: tagArray };
    }

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const posts = await Post.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    const total = await Post.countDocuments(filter);
    const totalPages = Math.ceil(total / limitNum);

    res.json({
      posts,
      pagination: {
        currentPage: pageNum,
        totalPages,
        totalPosts: total,
        hasNext: pageNum < totalPages,
        hasPrev: pageNum > 1,
      },
    });
  } catch (error) {
    console.error("Erreur GET /posts:", error);
    res.status(500).json({
      message: "Erreur serveur",
      error: error.message,
    });
  }
});

// GET /api/posts/:slug - Un post par slug
router.get("/:slug", async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });

    if (!post) {
      return res.status(404).json({ message: "Recette non trouvée" });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

module.exports = router;
