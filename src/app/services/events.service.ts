import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Event } from '../models/event';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  private baseURL = 'https://localhost:7118/api/Events';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getAllEvents() {
    return this.http.get<Event[]>(this.baseURL);
  }

  getEventById(id: number) {
    return this.http.get<Event>(`${this.baseURL}/${id}`);
  }

  updateEvent(id: number, event: Omit<Event, 'id' | 'hostId'>) {
    return this.http.put(`${this.baseURL}/${id}`, event);
  }

  deleteEvent(id: number, hostId: number) {
    if (this.authService.currentUserValue?.id != hostId) {
      return;
    }
    return this.http.delete(`${this.baseURL}/${id}`);
  }
}
