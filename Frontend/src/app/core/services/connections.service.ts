import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConnectionSummary, ConnectionSearchResult } from '../../shared/models/user.model';

@Injectable({ providedIn: 'root' })
export class ConnectionsService {
  private readonly apiBase = '/api/connections';

  constructor(private http: HttpClient) {}

  listMine(): Observable<ConnectionSummary[]> {
    return this.http.get<ConnectionSummary[]>(this.apiBase);
  }

  search(query: string): Observable<ConnectionSearchResult[]> {
    return this.http.get<ConnectionSearchResult[]>(`${this.apiBase}/search`, {
      params: { query },
    });
  }

  connect(userId: string): Observable<ConnectionSummary> {
    return this.http.post<ConnectionSummary>(this.apiBase, { userId });
  }
}
