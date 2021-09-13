import { Book } from './../../../models/book.model';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as bookActions from './book.actions';
import * as fromRoot from '../../../state/app.state';

export interface BookState extends EntityState<Book> {
  selectedBookId?: number | null;
  loading: boolean;
  loaded: boolean;
  error: string;
}

export interface AppState extends fromRoot.AppState {
  books: BookState;
}

export const bookAdapter: EntityAdapter<Book> = createEntityAdapter<Book>();

export const defaultBook: BookState = {
  ids: [],
  entities: {},
  selectedBookId: null,
  loading: false,
  loaded: false,
  error: '',
};

export const initialState = bookAdapter.getInitialState(defaultBook);

export function bookReducer(
  state = initialState,
  action: bookActions.Actions
): BookState {
  switch (action.type) {
    case bookActions.BookActionTypes.LOAD_BOOKS_SUCCESS: {
      return bookAdapter.addMany(action.payload, {
        ...state,
        loading: false,
        loaded: true,
      });
    }
    case bookActions.BookActionTypes.LOAD_BOOKS_FAIL: {
      return {
        ...state,
        entities: {},
        loading: false,
        loaded: false,
        error: action.payload,
      };
    }

    case bookActions.BookActionTypes.LOAD_BOOK_SUCCESS: {
      return bookAdapter.addOne(action.payload, {
        ...state,
        selectedBookId: action.payload.id,
      });
    }
    case bookActions.BookActionTypes.LOAD_BOOK_FAIL: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case bookActions.BookActionTypes.CREATE_BOOK_SUCCESS: {
      return bookAdapter.addOne(action.payload, state);
    }
    case bookActions.BookActionTypes.CREATE_BOOK_FAIL: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case bookActions.BookActionTypes.DELETE_BOOK_SUCCESS: {
      return bookAdapter.removeOne(action.payload, state);
    }
    case bookActions.BookActionTypes.DELETE_BOOK_FAIL: {
      return {
        ...state,
        error: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}

const getBookFeatureState = createFeatureSelector<BookState>('books');

export const getBooks = createSelector(
  getBookFeatureState,
  bookAdapter.getSelectors().selectAll
);

export const getBooksLoading = createSelector(
  getBookFeatureState,
  (state: BookState) => state.loading
);

export const getBooksLoaded = createSelector(
  getBookFeatureState,
  (state: BookState) => state.loaded
);

export const getError = createSelector(
  getBookFeatureState,
  (state: BookState) => state.error
);

export const getCurrentBookId = createSelector(
  getBookFeatureState,
  (state: BookState) => state.selectedBookId
);
export const getCurrentBook = createSelector(
  getBookFeatureState,
  getCurrentBookId,
  (state) => state.entities[state.selectedBookId as any]
);
