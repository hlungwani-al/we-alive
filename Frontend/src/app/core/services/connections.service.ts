import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConnectionSummary } from '../../shared/models/user.model';

@Injectable({ providedIn: 'root' })
export class ConnectionsService {
  private readonly apiBase = '/api/connections';

  constructor(private http: HttpClient) {}

  listMine(): Observable<ConnectionSummary[]> {
    return this.http.get<ConnectionSummary[]>(this.apiBase);
  }
}
