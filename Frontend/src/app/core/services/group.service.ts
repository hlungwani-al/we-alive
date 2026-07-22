import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GroupSummary } from '../../shared/models/user.model';

@Injectable({ providedIn: 'root' })
export class GroupService {
  private readonly apiBase = '/api/groups';

  constructor(private http: HttpClient) {}

  listMine(): Observable<GroupSummary[]> {
    return this.http.get<GroupSummary[]>(this.apiBase);
  }
}
