import { ButtonComponent } from './../shared-components/button/button.component';
import { BookAuthorComponent } from './book-author/book-author.component';
import { SharedModule } from './../../shared/shared.module';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BookTableComponent } from './book-table/book-table.component';
import { BookComponent } from './book/book.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const bookRoutes: Routes = [
  { path: '', component: BookComponent },
  { path: 'details/:id', component: BookDetailsComponent, pathMatch: 'full' },
  { path: 'author/:id', component: BookAuthorComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [CommonModule, SharedModule, RouterModule.forChild(bookRoutes)],
  declarations: [
    BookComponent,
    ButtonComponent,
    BookTableComponent,
    BookDetailsComponent,
    BookAuthorComponent,
  ],
  exports: [
    BookComponent,
    ButtonComponent,
    BookTableComponent,
    BookDetailsComponent,
    BookAuthorComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BooksModule {}
