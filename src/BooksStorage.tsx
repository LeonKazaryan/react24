export class BooksStorage {
  public async getBooks(): Promise<any[]> {
    return JSON.parse(localStorage.getItem("books") ?? "[]");
  }

  public async addBook(book: any): Promise<void> {
    let books = await this.getBooks();
    books.push(book);
    await this.setBooks(books);
  }

  public async setBooks(books: any[]): Promise<void> {
    localStorage.setItem("books", JSON.stringify(books));
  }

  public async deleteBook(book: any): Promise<void> {
    let books = await this.getBooks();
    let currentBook = books.find(book);
    localStorage.removeItem(book.id);
  }
}
