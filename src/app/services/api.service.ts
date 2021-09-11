import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  public getAll<T>(url: string): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}${url}`);
  }

  public get<T>(id: any, url: string): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}${url}/${id}`);
  }

  public post<T>(item: any, url: string): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}${url}`, item);
  }

  public put<T>(id: number, url: string, itemToUpdate: any): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}${url}/${id}`, itemToUpdate);
  }

  public delete<T>(id: string, url: string): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}${url}/${id}`);
  }
}
