import { BookService } from './../../../services/book.service';
import { Book } from './../../../models/book.model';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import * as fromBook from '../state/book.reducer';
import * as fromAuthor from '../state/author.reducer';
import * as bookActions from '../state/book.actions';
import { Author } from './../../../models/author.model';

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.scss'],
})
export class BookAddComponent implements OnInit {
  public authors: string[];
  public selectedAuthor: string = '';
  public subscription: Subscription;
  public bookForm: FormGroup;
  public id?: number;

  constructor(
    private apiService: ApiService,
    private bookService: BookService,
    private fb: FormBuilder,
    private store: Store<fromBook.AppState>,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.apiService.getAll<Book[]>(`books`).subscribe((data: any) => {
      const newAuthorsArr: any[] = [];
      data.map((authors: any) => {
        authors.author.map((author: any) => {
          newAuthorsArr.push(author.name);
        });
      });
      this.authors = [...new Set(newAuthorsArr)];
    });

    this.bookForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(7)]),
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

    // Reset form after submit
    this.bookForm.reset();

    this.router.navigateByUrl('books');
  }

  public getId(author: any): void {
    this.bookService.getAuthors().subscribe((authors: Author[]) => {
      authors.forEach((author: any) => {
        if (author.name === author) {
          this.id = author.id;
        }
      });
    });
  }

  get title() {
    return this.bookForm.get('title') as FormControl;
  }

  get author() {
    return this.bookForm.get('author') as FormControl;
  }

  public getAuthors(): void {
    this.apiService.getAll<Book[]>(`books`).subscribe((data: any) => {
      const newAuthorsArr: any[] = [];
      data.map((authors: any) => {
        authors.author.map((author: any) => {
          newAuthorsArr.push(author.name);
        });
      });
      this.authors = [...new Set(newAuthorsArr)];
    });
  }

  public getSelectedAuthor(event: any): void {
    this.getId(event.value);
    this.selectedAuthor = event.value;
  }

  public ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
