import { AuthorEffect } from './state/author.effects';
import { ButtonComponent } from './../shared-components/button/button.component';
import { BookAuthorComponent } from './book-author/book-author.component';
import { SharedModule } from './../../shared/shared.module';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BookTableComponent } from './book-table/book-table.component';
import { BookComponent } from './book/book.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { bookReducer } from './state/book.reducer';
import { BookEffect } from './state/book.effects';
import { BookAddComponent } from './book-add/book-add.component';
import { authorReducer } from './state/author.reducer';

const bookRoutes: Routes = [
  { path: '', component: BookComponent },
  { path: 'details/:id', component: BookDetailsComponent, pathMatch: 'full' },
  { path: 'author/:id', component: BookAuthorComponent, pathMatch: 'full' },
  { path: 'add', component: BookAddComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(bookRoutes),
    StoreModule.forFeature('books', bookReducer),
    StoreModule.forFeature('authors', authorReducer),
    EffectsModule.forFeature([BookEffect, AuthorEffect])
  ],
  declarations: [
    BookComponent,
    ButtonComponent,
    BookTableComponent,
    BookDetailsComponent,
    BookAuthorComponent,
    BookAddComponent,
  ],
  exports: [
    BookComponent,
    ButtonComponent,
    BookTableComponent,
    BookDetailsComponent,
    BookAuthorComponent,
    BookAddComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BooksModule {}
