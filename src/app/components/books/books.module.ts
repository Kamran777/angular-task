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
];

@NgModule({
  imports: [CommonModule, SharedModule, RouterModule.forChild(bookRoutes)],
  declarations: [BookComponent, BookTableComponent, BookDetailsComponent],
  exports: [BookComponent, BookTableComponent, BookDetailsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BooksModule {}
