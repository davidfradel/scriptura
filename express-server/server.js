/* eslint-disable no-console */
/* eslint-disable consistent-return */
const express = require('express');
const bodyParser = require('body-parser');

const { body, query, validationResult } = require('express-validator');

const Guardian = require('guardian/dist/index').default;

const connectDB = require('../config/db');

const app = express();
app.use(bodyParser.json({ limit: '50mb' }));

const guardian = new Guardian();

// Route to add a single book
app.post('/books', [
  body('title').isString().trim().notEmpty()
    .withMessage('Title must be a non-empty string'),
  body('author').isString().trim().notEmpty()
    .withMessage('Author must be a non-empty string'),
  body('publicationDate').isISO8601().toDate().withMessage('Publication date must be a valid date'),
  body('pages').isArray().withMessage('Pages must be an array'),
  body('pages.*.pageNumber').isInt({ min: 1 }).withMessage('Page number must be an integer greater than 0'),
  body('pages.*.content').isString().trim().notEmpty()
    .withMessage('Page content must be a non-empty string'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    await guardian.addBook(req.body);
    res.status(201).send('Book added successfully');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Route to import multiple books
app.post('/books/import', async (req, res) => {
  // Assuming the request body contains an array of books
  try {
    await guardian.importBooks(req.body);
    res.status(201).send('Books imported successfully');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Route to list books with optional search, filter, and pagination
app.get('/books', [
  query('page').optional().isInt({ min: 1 }),
  query('pageSize').optional().isInt({ min: 1 }),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { searchQuery, page, pageSize } = req.query;
  try {
    const books = await guardian.listBooks({ searchQuery, page, pageSize });
    res.json(books);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Route to delete a book by ID
app.delete('/books/:id', async (req, res) => {
  try {
    await guardian.deleteBook(req.params.id);
    res.send('Book deleted successfully');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Route to update a book by ID
app.put('/books/:id', [
  body('title').optional().isString().trim()
    .notEmpty(),
  body('author').optional().isString().trim()
    .notEmpty(),
  body('publicationDate').optional().isISO8601().toDate(),
  body('summary').optional().isString().trim()
    .notEmpty(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    await guardian.updateBook(req.params.id, req.body);
    res.send('Book updated successfully');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Route for the special list books functionality
app.get('/books/special', async (req, res) => {
  try {
    const books = await guardian.specialListBooks();
    res.json(books);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Route to create a collection from a list of book IDs
app.post('/collections', [
  body('bookIds').isArray().withMessage('Book IDs must be an array'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const collection = await guardian.createCollection(req.body.bookIds);
    res.status(201).json(collection);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Start the server
// Connect to MongoDB
connectDB().then(() => {
  console.log('Database connected, server starting...');
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch((err) => console.error(err));
