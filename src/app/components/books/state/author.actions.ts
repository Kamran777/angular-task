import { Author } from './../../../models/author.model';
import { Action } from '@ngrx/store';

export enum AuthorActionTypes {
  LOAD_AUTHORS = '[Author] Load Authors',
  LOAD_AUTHORS_SUCCESS = '[Author] Load Authors Success',
  LOAD_AUTHORS_FAIL = '[Author] Load Authors Fail',
  LOAD_AUTHOR = '[Author] Load Author',
  LOAD_AUTHOR_SUCCESS = '[Author] Load Author Success',
  LOAD_AUTHOR_FAIL = '[Author] Load Author Fail',
}

export class LoadAuthors implements Action {
  readonly type = AuthorActionTypes.LOAD_AUTHORS;
}

export class LoadAuthorsSuccess implements Action {
  readonly type = AuthorActionTypes.LOAD_AUTHORS_SUCCESS;

  constructor(public payload: Author[]) {}
}

export class LoadAuthorsFail implements Action {
  readonly type = AuthorActionTypes.LOAD_AUTHORS_FAIL;

  constructor(public payload: string) {}
}

export class LoadAuthor implements Action {
  readonly type = AuthorActionTypes.LOAD_AUTHOR;

  constructor(public payload: number) {}
}

export class LoadAuthorSuccess implements Action {
  readonly type = AuthorActionTypes.LOAD_AUTHOR_SUCCESS;

  constructor(public payload: Author) {}
}

export class LoadAuthorFail implements Action {
  readonly type = AuthorActionTypes.LOAD_AUTHOR_FAIL;

  constructor(public payload: string) {}
}

export type Actions =
  | LoadAuthors
  | LoadAuthorsSuccess
  | LoadAuthorsFail
  | LoadAuthor
  | LoadAuthorSuccess
  | LoadAuthorFail;
