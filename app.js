const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Load database configuration
require('./index');

// Load article model
const Article = require('./models/article');

// Get all articles
app.get('/articles', (req, res) => {
  Article.find()
    .then(articles => res.json(articles))
    .catch(err => console.log(err));
});

// Get single article by ID
app.get('/articles/:id', (req, res) => {
  Article.findById(req.params.id)
    .then(article => res.json(article))
    .catch(err => console.log(err));
});

// Create new article
app.post('/articles', (req, res) => {
  const { title, body } = req.body;
  const article = new Article({ title, body });
  article.save()
    .then(article => res.json(article))
    .catch(err => console.log(err));
});

// Update article by ID
app.put('/articles/:id', (req, res) => {
  Article.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(article => res.json(article))
    .catch(err => console.log(err));
});

// Delete article by ID
app.delete('/articles/:id', (req, res) => {
  Article.findByIdAndDelete(req.params.id)
    .then(() => res.json({ success: true }))
    .catch(err => console.log(err));
});

// Start server
app.listen(port, () => console.log(`Server running on port ${port}`));
