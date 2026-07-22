import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CheckinResponse {
  checkedInAt: string;
}

@Injectable({ providedIn: 'root' })
export class CheckinService {
  private readonly apiBase = '/api/checkin';

  constructor(private http: HttpClient) {}

  /** Marks the user alive across all of their groups in one call. */
  checkIn(): Observable<CheckinResponse> {
    return this.http.post<CheckinResponse>(this.apiBase, {});
  }
}
