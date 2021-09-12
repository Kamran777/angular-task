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

  constructor(
    private apiService: ApiService,
    private _activatedRoute: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.getDataById();
  }

  public getDataById(): void {
    this.subscription = this._activatedRoute.params.subscribe((params) => {
      const id = params['id'];
      this.subscription = this.apiService
        .get<Book>(id, `books`)
        .subscribe((book: Book) => {
          this.book = book;
        });
    });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
