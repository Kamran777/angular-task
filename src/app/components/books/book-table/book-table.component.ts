import { Book } from './../../../models/book.model';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-book-table',
  templateUrl: './book-table.component.html',
  styleUrls: ['./book-table.component.scss'],
})
export class BookTableComponent implements OnInit, OnDestroy {
  public subscription: Subscription;
  public disableRouterLink: boolean = true;
  @Input() public books: Book[];
  @Input() public showLoader: boolean = false;
  @Input() public title: string = 'BOOK TABLE';

  constructor(private apiService: ApiService) {}

  public ngOnInit(): void {
    this.showLoader = true;
    if (!this.books) {
      this.disableRouterLink = false;
      this.getAllBooks();
    }
  }

  public getAllBooks(): void {
    this.subscription = this.apiService
      .getAll<Book[]>(`books`)
      .subscribe((books: any) => {
        setTimeout(() => {
          this.showLoader = false;
          this.books = books;
        }, 1000);
      });
  }

  public disableRouter(): boolean {
    return this.disableRouterLink ? true : false;
  }

  public ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription?.unsubscribe();
    }
  }
}
