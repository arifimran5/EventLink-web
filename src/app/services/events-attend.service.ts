import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Attendee } from '../models/attendee';

@Injectable({
  providedIn: 'root',
})
export class EventsAttendService {
  private baseUrl = 'https://localhost:7118/api/EventAttend';

  constructor(private http: HttpClient, private authService: AuthService) {}

  currentUser = this.authService.currentUserValue;

  getAllAttendees(evt_id: number) {
    return this.http.get<Attendee[]>(`${this.baseUrl}/${evt_id}`);
  }

  attendEvent(evt_id: number) {
    return this.http.post(`${this.baseUrl}/${evt_id}`, {});
  }

  removeAttendeeFromEvent(evt_id: number) {
    return this.http.delete(`${this.baseUrl}/${evt_id}`, {});
  }

  isAttending(evt_id: number) {
    return this.http.get<{ result: boolean; message: string }>(
      `${this.baseUrl}/checkAttending/${evt_id}`
    );
  }
}
