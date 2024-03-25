const addBookSchema = {
  body: {
    type: 'object',
    required: ['title', 'author', 'publicationDate', 'pages'],
    properties: {
      title: { type: 'string', minLength: 1 },
      author: { type: 'string', minLength: 1 },
      publicationDate: { type: 'string', format: 'date' },
      pages: {
        type: 'array',
        items: {
          type: 'object',
          required: ['pageNumber', 'content'],
          properties: {
            pageNumber: { type: 'integer', minimum: 1 },
            content: { type: 'string', minLength: 1 },
          },
        },
      },
    },
  },
};

const importBooksSchema = {
  body: {
    type: 'array',
    items: {
      type: 'object',
      required: ['title', 'author', 'publicationDate', 'pages'],
      properties: {
        title: { type: 'string', minLength: 1 },
        author: { type: 'string', minLength: 1 },
        publicationDate: { type: 'string', format: 'date' },
        pages: {
          type: 'array',
          items: {
            type: 'object',
            required: ['pageNumber', 'content'],
            properties: {
              pageNumber: { type: 'integer', minimum: 1 },
              content: { type: 'string', minLength: 1 },
            },
          },
        },
      },
    },
  },
};

const listBooksSchema = {
  querystring: {
    type: 'object',
    properties: {
      page: { type: 'integer', minimum: 1, default: 1 },
      pageSize: { type: 'integer', minimum: 1, default: 10 },
      title: { type: 'string', minLength: 1 },
      author: { type: 'string', minLength: 1 },
    },
  },
};

const deleteBookSchema = {
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string', minLength: 1 },
    },
  },
};

const updateBookSchema = {
  body: {
    type: 'object',
    properties: {
      title: { type: 'string', minLength: 1 },
      author: { type: 'string', minLength: 1 },
      publicationDate: { type: 'string', format: 'date' },
      pages: {
        type: 'array',
        items: {
          type: 'object',
          required: ['pageNumber', 'content'],
          properties: {
            pageNumber: { type: 'integer', minimum: 1 },
            content: { type: 'string', minLength: 1 },
          },
        },
      },
    },
  },
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string', minLength: 1 },
    },
  },
};

module.exports = {
  addBookSchema,
  importBooksSchema,
  listBooksSchema,
  deleteBookSchema,
  updateBookSchema,
};
