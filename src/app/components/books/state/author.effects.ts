import { BookService } from './../../../services/book.service';
import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

import * as authorActions from '../state/author.actions';
import { Author } from 'src/app/models/author.model';

@Injectable()
export class AuthorEffect {
  constructor(private actions$: Actions, private bookService: BookService) {}

  @Effect()
  loadAuthors$: Observable<Action> = this.actions$.pipe(
    ofType<authorActions.LoadAuthors>(
      authorActions.AuthorActionTypes.LOAD_AUTHORS
    ),
    mergeMap((action: authorActions.LoadAuthors) =>
      this.bookService.getAuthors().pipe(
        map(
          (authors: Author[]) => new authorActions.LoadAuthorsSuccess(authors)
        ),
        catchError((err) => of(new authorActions.LoadAuthorsFail(err)))
      )
    )
  );

  @Effect()
  loadAuthor$: Observable<Action> = this.actions$.pipe(
    ofType<authorActions.LoadAuthor>(
      authorActions.AuthorActionTypes.LOAD_AUTHOR
    ),
    mergeMap((action: authorActions.LoadAuthor) =>
      this.bookService.getAuthorById(action.payload).pipe(
        map((author: Author) => new authorActions.LoadAuthorSuccess(author)),
        catchError((err) => of(new authorActions.LoadAuthorFail(err)))
      )
    )
  );
}
