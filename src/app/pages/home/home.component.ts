import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../services/events.service';
import { Event } from '../../models/event';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  events: Event[] = [];
  constructor(private eventsService: EventsService) {}

  ngOnInit() {
    this.eventsService.getAllEvents().subscribe((val) => {
      this.events = val;
    });
  }
}
