import { BookService } from './../../../services/book.service';
import { Book } from './../../../models/book.model';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
})
export class BookDetailsComponent implements OnInit {
  public id: number;
  public book: Book;
  public subscription: Subscription;
  public isShow: boolean = false;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private bookService: BookService
  ) {}

  public ngOnInit(): void {
    this.getDataById();
  }

  public getDataById(): void {
    this.subscription = this._activatedRoute.params.subscribe((params) => {
      const id = params['id'];
      this.subscription = this.bookService
        .getBookById(id)
        .subscribe((book: Book) => {
          setTimeout(() => {
            this.isShow = true;
            this.book = book;
          }, 1000)
        });
    });
  }

  public ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }
}
