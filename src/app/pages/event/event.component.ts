import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, TitleStrategy } from '@angular/router';
import { EventsService } from '@/app/services/events.service';
import { Event } from '@/app/models/event';
import { EventsAttendService } from '@/app/services/events-attend.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Attendee } from '@/app/models/attendee';
import { AuthService } from '@/app/services/auth.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrl: './event.component.css',
})
export class EventComponent implements OnInit {
  eventId: number = 0;
  event: Event | undefined = undefined;
  isAttending$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isHost = false;
  // attendees: Subject<Attendee[]> = new Subject();
  attendees: Attendee[] = [];

  constructor(
    private activatedRouter: ActivatedRoute,
    private eventService: EventsService,
    private router: Router,
    private eventAttendService: EventsAttendService,
    private authService: AuthService
  ) {
    this.activatedRouter.paramMap.subscribe((val) => {
      this.eventId = parseInt(val.get('id')!);
    });
  }

  ngOnInit() {
    this.eventService.getEventById(this.eventId).subscribe({
      next: (val) => {
        this.event = val;

        if (val.hostId == this.authService.currentUserValue?.id) {
          this.isHost = true;
        }
      },
      error: (err) => {
        this.event = undefined;
        console.error(err);
      },
    });

    this.eventAttendService.isAttending(this.eventId).subscribe((val) => {
      this.isAttending$.next(val.result);
      this.fetchAttendees();
    });
  }

  fetchAttendees() {
    if (this.isHost || this.isAttending$.value) {
      this.eventAttendService.getAllAttendees(this.eventId).subscribe({
        next: (attendees) => {
          // this.attendees.next(attendees);
          this.attendees = attendees;
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  handleAttend() {
    this.eventAttendService.attendEvent(this.eventId).subscribe({
      next: () => {
        this.isAttending$.next(true);
        this.fetchAttendees();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  handleCancelAttend() {
    this.eventAttendService.removeAttendeeFromEvent(this.eventId).subscribe({
      next: () => {
        this.isAttending$.next(false);
        this.fetchAttendees();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
