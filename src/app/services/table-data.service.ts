import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TableData {
  id: number;
  name: string;
  email: string;
  status?: string; // Optional, as JSONPlaceholder doesn't have 'status'
}

@Injectable({
  providedIn: 'root'
})
export class TableDataService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) {}

  getTableData(): Observable<TableData[]> {
    return this.http.get<TableData[]>(this.apiUrl);
  }
}