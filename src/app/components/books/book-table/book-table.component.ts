import { Book } from './../../../models/book.model';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import * as fromBook from '../state/book.reducer';
import * as bookActions from '../state/book.actions';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-book-table',
  templateUrl: './book-table.component.html',
  styleUrls: ['./book-table.component.scss'],
})
export class BookTableComponent implements OnInit {
  public error$: Observable<String>;

  @Input() public books$: Observable<Book[]>;
  @Input() public showLoader: boolean = false;
  @Input() public disableRouterLink: boolean = true;
  @Input() public title: string = '';
  @Input() public hideActions: boolean = false;

  constructor(
    private store: Store<fromBook.AppState>,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  public ngOnInit(): void {
    this.showLoader = true;
    if (!this.books$) {
      this.getAllBooks();
    }
    this.error$ = this.store.pipe(select(fromBook.getError));
  }

  public getAllBooks(): void {
    this.store.dispatch(new bookActions.LoadBooks());
    setTimeout(() => {
      this.showLoader = false;
      this.books$ = this.store.pipe(select(fromBook.getBooks));
    }, 1000);
    this.error$ = this.store.pipe(select(fromBook.getError));
  }

  public disableRouter(): boolean {
    return this.disableRouterLink ? true : false;
  }

  public deleteBook(book: Book): void {
    this.confirmationService.confirm({
      message: 'Are You Sure You want to Delete the Book?',
      accept: () => {
        this.store.dispatch(new bookActions.DeleteBook(book.id as any));
        this.confirmationService.close();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'You successfully deleted a book!',
        });
      },
      reject: () => {
        this.confirmationService.close();
        this.messageService.add({
          severity: 'info',
          summary: 'Info',
          detail: 'You declined delete book operation!',
        });
      },
    });
  }
}
