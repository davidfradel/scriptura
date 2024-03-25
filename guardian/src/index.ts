import mongoose, { Schema, Document, Model } from 'mongoose';

// Definition of interfaces for the documents
interface IPage extends Document {
  pageNumber: number;
  content: string;
}

interface IBook extends Document {
  title: string;
  author: string;
  publicationDate: Date;
  pages: IPage[];
  price?: number; // The price is optional
}

// Definition of schemas
const pageSchema = new Schema<IPage>({
  pageNumber: { type: Number, required: true },
  content: { type: String, required: true },
});

const bookSchema = new Schema<IBook>({
  title: { type: String, required: true, unique: true }, // Ensure the title is unique to prevent duplicates
  author: { type: String, required: true },
  publicationDate: { type: Date, required: true },
  pages: [pageSchema],
});

// Model creation
const Book: Model<IBook> = mongoose.model<IBook>('Book', bookSchema);

class Gardian {
  // Add a book
  async addBook(bookData: IBook): Promise<void> {
    const book = new Book(bookData);
    await book.save();
  }

  // Import multiple books
  async importBooks(booksData: IBook[]): Promise<void> {
    await Book.insertMany(booksData);
  }

  // List books with optional search and pagination
  async listBooks({ searchQuery = {}, page = 1, pageSize = 10 }): Promise<IBook[]> {
    const books = await Book.find(searchQuery)
                            .skip((page - 1) * pageSize)
                            .limit(pageSize);
    return books;
  }

  // Delete a book by its identifier
  async deleteBook(bookId: string): Promise<void> {
    await Book.findByIdAndDelete(bookId);
  }

  // Update a book by its identifier
  async updateBook(bookId: string, updateData: Partial<IBook>): Promise<IBook | null> {
    const book = await Book.findByIdAndUpdate(bookId, updateData, { new: true });
    return book;
  }

  // List books in a special way
  async listBooksSpecial(): Promise<any[]> {
    const books = await Book.find().lean();

    for (const book of books) {
      book.pages.sort((a, b) => a.content.localeCompare(b.content));
      book.price = await this.getBookPrice(book._id.toString());
    }
    return books;
  }

  // Create an anthology from a list of books
  async createAnthology(bookIds: string[]): Promise<IBook> {
    const books = await Book.find({ _id: { $in: bookIds } });
    const anthologyPages = books.flatMap(book => book.pages);
    const anthology = new Book({
      title: 'Anthology',
      author: 'Various',
      publicationDate: new Date(),
      pages: anthologyPages,
    });
    await anthology.save();
    return anthology;
  }

  // Function to retrieve the price of a book via a fictitious API
  async getBookPrice(bookId: string): Promise<number> {
    // This method should simulate a call to an external API to retrieve the price of a book.
    // Implement the necessary logic here.
    // For example, return a random or fixed price for the test.
    return Math.random() * 50; // Fictitious price for the example
  }
}

export default Gardian;