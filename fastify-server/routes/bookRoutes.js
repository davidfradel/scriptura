const { 
  addBookSchema,
  importBooksSchema,
  listBooksSchema,
  deleteBookSchema,
  updateBookSchema,
} = require('../schemas/bookSchema');

module.exports = async function (fastify, options) {
  const { guardian } = options; // Retrieve the instance of Guardian

  // Route to add a book
  fastify.post('/books', { schema: addBookSchema }, async (request, reply) => {
    try {
      await guardian.addBook(request.body);
      reply.code(201).send({ message: 'Book added successfully' });
    } catch (error) {
      reply.send(error);
    }
  });

  // Route to import books in bulk
  fastify.post('/books/import', { schema: importBooksSchema }, async (request, reply) => {
    try {
      await guardian.importBooks(request.body);
      reply.code(201).send({ message: 'Books imported successfully' });
    } catch (error) {
      reply.send(error);
    }
  });

  // Route to list books with pagination
  fastify.get('/books', { schema: listBooksSchema }, async (request, reply) => {
    try {
      const { query } = request;
      const books = await guardian.listBooks(query);
      reply.send(books);
    } catch (error) {
      reply.send(error);
    }
  });

  // Route to delete a book by ID
  fastify.delete('/books/:id', { schema: deleteBookSchema }, async (request, reply) => {
    try {
      await guardian.deleteBook(request.params.id);
      reply.send({ message: 'Book deleted successfully' });
    } catch (error) {
      reply.send(error);
    }
  });

  // Route to update a book by ID
  fastify.put('/books/:id', { schema: updateBookSchema }, async (request, reply) => {
    try {
      await guardian.updateBook(request.params.id, request.body);
      reply.send({ message: 'Book updated successfully' });
    } catch (error) {
      reply.send(error);
    }
  });
};