import { getAuthors } from './../components/books/state/author.reducer';
import { Author } from './../models/author.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Book } from '../models/book.model';


@Injectable({
  providedIn: 'root'
})
export class BookService {
  private booksUrl = 'http://localhost:3000/books';
  private authorUrl = 'http://localhost:3000/authors';

  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.booksUrl);
  }

  getBookById(payload: number): Observable<Book> {
    return this.http.get<Book>(`${this.booksUrl}/${payload}`);
  }

  getAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(this.authorUrl);
  }

  getAuthorById(payload: number): Observable<Author> {
    return this.http.get<Author>(`${this.authorUrl}/${payload}`);
  }

  createBook(payload: Book): Observable<Book> {
    return this.http.post<Book>(this.booksUrl, payload);
  }

  updateBook(customer: Book): Observable<Book> {
    return this.http.patch<Book>(
      `${this.booksUrl}/${customer.id}`,
      customer
    );
  }

  deleteBook(payload: number) {
    return this.http.delete(`${this.booksUrl}/${payload}`);
  }
}
