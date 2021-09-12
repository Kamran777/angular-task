import { BookService } from './../../../services/book.service';
import { Book } from './../../../models/book.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription, Observable, of } from 'rxjs';

@Component({
  selector: 'app-book-author',
  templateUrl: './book-author.component.html',
  styleUrls: ['./book-author.component.scss'],
})
export class BookAuthorComponent implements OnInit {
  public books$: Observable<Book[]>;
  public books: Book[] = [];
  public id: number = 0;
  public showLoader: boolean = false;
  public title: string = 'BOOKS BY AUTHOR';
  public subscription: Subscription;

  constructor(
    private bookService: BookService,
    private _activatedRoute: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.showLoader = true;
    this.getDataByAuthor();
  }

  public getDataByAuthor(): void {
    this._activatedRoute.params.subscribe((params: Params) => {
      this.id = Number(params['id']);
      this.books$ = this.getBooksByAuthor(this.id);
    });
  }

  public getBooksByAuthor(id: number): Observable<Book[]> {
    this.subscription = this.bookService.getBooks().subscribe((data: any) => {
      data.map((value: any) => {
        if (
          value.author
            .map((author: any) => {
              return author.id;
            })
            .indexOf(id) !== -1
        ) {
          setTimeout(() => {
            this.showLoader = false;
            this.books.push(value);
          }, 1000);
        }
      });
    });
    return of(this.books);
  }

  public ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
