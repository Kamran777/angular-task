import { Book } from './../../../models/book.model';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.scss'],
})
export class BookAddComponent implements OnInit {
  public authors: string[];
  public selectedAuthor: string = '';
  public subscription: Subscription;

  constructor(private apiService: ApiService) {}

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
  }

  public getSelectedAuthor(event: any): void {
    this.selectedAuthor = event.value;
  }

  public ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
