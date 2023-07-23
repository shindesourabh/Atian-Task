import { Pipe, PipeTransform } from '@angular/core';
import { Book } from './services/book.model';
@Pipe({
  name: 'serchfilter'
})
export class SerchfilterPipe implements PipeTransform {

  transform(books: Book[], searchTerm?: any): unknown {
    if (!searchTerm) {
      return books; // If no search term provided, return the original list
    }
    searchTerm = searchTerm.toLowerCase();
    return books.filter(book =>
      book.bookId.toString().includes(searchTerm)||
      book.title.toLowerCase().includes(searchTerm) ||
      book.author.toLowerCase().includes(searchTerm)
    );
  }
  }
