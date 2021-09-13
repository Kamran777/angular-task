import { Author } from './../../../models/author.model';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as authorActions from './author.actions';
import * as fromRoot from '../../../state/app.state';

export interface AuthorState extends EntityState<Author> {
  selectedAuthorId?: number | null;
  loading: boolean;
  loaded: boolean;
  error: string;
}

export interface AppState extends fromRoot.AppState {
  authors: AuthorState;
}

export const authorAdapter: EntityAdapter<Author> =
  createEntityAdapter<Author>();

export const defaultAuthor: AuthorState = {
  ids: [],
  entities: {},
  selectedAuthorId: null,
  loading: false,
  loaded: false,
  error: '',
};

export const initialState = authorAdapter.getInitialState(defaultAuthor);

export function authorReducer(
  state = initialState,
  action: authorActions.Actions
): AuthorState {
  switch (action.type) {
    case authorActions.AuthorActionTypes.LOAD_AUTHORS_SUCCESS: {
      return authorAdapter.addMany(action.payload, {
        ...state,
        loading: false,
        loaded: true,
      });
    }
    case authorActions.AuthorActionTypes.LOAD_AUTHORS_FAIL: {
      return {
        ...state,
        entities: {},
        loading: false,
        loaded: false,
        error: action.payload,
      };
    }

    case authorActions.AuthorActionTypes.LOAD_AUTHOR_SUCCESS: {
      return authorAdapter.addOne(action.payload, {
        ...state,
        selectedAuthorId: action.payload.id,
      });
    }
    case authorActions.AuthorActionTypes.LOAD_AUTHOR_FAIL: {
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

const getAuthorFeatureState = createFeatureSelector<AuthorState>('authors');

export const getAuthors = createSelector(
  getAuthorFeatureState,
  authorAdapter.getSelectors().selectAll
);

export const getAuthorsLoading = createSelector(
  getAuthorFeatureState,
  (state: AuthorState) => state.loading
);

export const getAuthorsLoaded = createSelector(
  getAuthorFeatureState,
  (state: AuthorState) => state.loaded
);

export const getError = createSelector(
  getAuthorFeatureState,
  (state: AuthorState) => state.error
);

export const getCurrentAuthorId = createSelector(
  getAuthorFeatureState,
  (state: AuthorState) => state.selectedAuthorId
);
export const getCurrentAuthor = createSelector(
  getAuthorFeatureState,
  getCurrentAuthorId,
  (state) => state.entities[state.selectedAuthorId as any]
);
