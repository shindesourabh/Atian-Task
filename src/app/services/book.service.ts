import { Injectable } from '@angular/core';
import { Book } from './book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private books: Book[] = [];

  constructor() { }

   getBooks(): Book[] {
    return this.books;
  }

  addBook(book: Book): void {
    this.books.push(book);
  }

  deleteBook(index: number): void {
    this.books.splice(index, 1);
  }

  updateBook(updatedBook: Book): void {
    const index = this.books.findIndex((book) => book.bookId === updatedBook.bookId);
    if (index !== -1) {
      this.books[index] = updatedBook;
    }
  }
}
