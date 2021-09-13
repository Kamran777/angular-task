import { Book } from './../../../models/book.model';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import * as fromBook from '../state/book.reducer';
import * as bookActions from '../state/book.actions';
import { Author } from './../../../models/author.model';
import { BookService } from 'src/app/services/book.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.scss'],
})
export class BookAddComponent implements OnInit {
  public authors: string[];
  public selectedAuthor: string = '';
  public subscriptions: Subscription[] = [];
  public bookForm: FormGroup;
  public id?: number;

  constructor(
    private bookService: BookService,
    private store: Store<fromBook.AppState>,
    private router: Router,
    private messageService: MessageService
  ) {}

  public ngOnInit(): void {
    this.getAllAuthors();

    this.bookForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(7),
      ]),
      author: new FormControl('', [Validators.required]),
    });
  }

  public addBook(): void {
    const newBook: Book = {
      title: this.title.value,
      author: [
        {
          id: this.id,
          name: this.author.value,
        },
      ],
    };

    this.store.dispatch(new bookActions.CreateBook(newBook));
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'You successfully added a book!',
    });
    // Reset form after submit
    this.bookForm.reset();
    this.router.navigateByUrl('books');
  }

  public getId(author: string): void {
    this.subscriptions.push(
      this.bookService.getAuthors().subscribe((authors: Author[]) => {
        authors.forEach((authorValue: any) => {
          if (authorValue.name === author) {
            this.id = authorValue.id;
          }
        });
      })
    );
  }

  private get title(): any {
    return this.bookForm.get('title') as FormControl;
  }

  private get author(): any {
    return this.bookForm.get('author') as FormControl;
  }

  public getAllAuthors(): void {
    this.subscriptions.push(
      this.bookService.getAuthors().subscribe((data: any) => {
        const newAuthorsArr: any[] = [];
        data.map((author: Author) => {
          newAuthorsArr.push(author.name);
        });
        this.authors = [...new Set(newAuthorsArr)];
      })
    );
  }

  public getSelectedAuthor(event: any): void {
    this.getId(event.value);
    this.selectedAuthor = event.value;
  }

  public ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }
  }
}
