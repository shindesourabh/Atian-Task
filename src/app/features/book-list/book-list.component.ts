import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { Book } from 'src/app/services/book.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  click1: boolean = false;
  BookForm!: FormGroup;
  public books: any = [];
  isEditMode: boolean = false;
  selectedBookIndex: number | null = null;
  newBookUpdate: any;
  localStorageKey = 'books';
  isOpenForm: boolean = false; 
  isOpenList: boolean = true;
  isOpenEditBtn: boolean = true;
  isOpenAddtBtn: boolean = true;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.books = [];
    this.BookForm = this.formBuilder.group({
      id: ['', [Validators.required]],
      title: ['', [Validators.required]],
      author: ['', [Validators.required]],
      date: ['', [Validators.required]],
      price: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.fetchBooksFromLocalStorage();
    this.getBooks();
  }

  getBooks(): Book[] {
    return this.books;
  }

  // add new book in form list
  public addBook(): void {
    debugger
    if (this.BookForm.valid) {
      if (this.isOpenAddtBtn) {
        this.books.push(this.BookForm.value);
        this.BookForm.reset();
        this.isOpenList = true;
        this.saveBooksToLocalStorage();
        this.resetForm()
      }
    } else {
      alert('Form is invalid')
    }
  };

  SaveChanges(): void {
    debugger
    this.addBook(); // Save changes using the same addBook method
    this.isOpenForm = false;
  }

  deleteBook(index: number): void {
    const isConfirmed = confirm('Are you sure you want to delete this book?');
    if (isConfirmed) {
      this.books.splice(index, 1);
      this.saveBooksToLocalStorage();
    }
  }
  // Fetch Data From the Form Add stored local Storage
  fetchBooksFromLocalStorage() {
    const storedBooks = localStorage.getItem(this.localStorageKey);
    this.books = storedBooks ? JSON.parse(storedBooks) : [];
  }

  //set data local storage
  saveBooksToLocalStorage() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.books));
  }

  //// Cancel Btn in Add Book Form
  cancelAddForm() {
    this.BookForm.reset()
    this.isOpenAddtBtn = false;
    this.isOpenForm = false;
    this.isOpenList = true;
  }

  // Cancel Btn in Update Book Form
  cancelUpdateForm() {
    this.BookForm.reset()
    this.isOpenEditBtn = false;
    this.isOpenForm = false;
    this.isOpenList = true;
  }

  // Row Selected On Click Edit Button
  RowSelected(index: any) {
    this.selectedBookIndex = index;
    const selectedBook = this.books[index];
    this.BookForm.setValue(selectedBook);
    this.isOpenForm = true;
    this.isOpenList = false
    this.isOpenAddtBtn = false;
    this.isOpenEditBtn = true;
  }

  //update book list data
  UpdateChanges(): void {
    if (this.BookForm.valid) {
      if (this.isOpenEditBtn && this.selectedBookIndex !== null) {
        this.books[this.selectedBookIndex] = this.BookForm.value;  // Update existing book
        this.isOpenEditBtn = false;
        this.selectedBookIndex = null;
      } else {
        this.books.push(this.BookForm.value); // Add new books 
      }
      this.isOpenForm = false;
      this.isOpenList = true
      this.BookForm.reset();
    } else {
      alert('Form is invalid');
    }
  }

  // Add New Form
  addNewBookForm() {
    this.isOpenForm = true
    this.isOpenList = false
    this.isOpenAddtBtn = true
    this.isOpenEditBtn = false;
    this.resetForm()
  }

  // Add Reset Form
  resetForm() {
    this.BookForm.reset()
  }
}
