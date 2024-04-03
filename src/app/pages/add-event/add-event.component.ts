import { CreateEvent } from '@/app/models/event';
import { EventsService } from '@/app/services/events.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrl: './add-event.component.css',
})
export class AddEventComponent {
  createEventData: any = {
    name: '',
    date: '',
    description: '',
    link: '',
  };

  constructor(private eventService: EventsService, private router: Router) {}

  addImage(evt: any) {
    if (evt.target?.files) {
      this.createEventData.image = evt.target.files[0];
    }
  }

  handleSubmit() {
    const formData = new FormData();
    formData.append('name', this.createEventData.name);
    formData.append('description', this.createEventData.description);
    formData.append('date', this.createEventData.date);

    if (this.createEventData.image) {
      formData.append(
        'image',
        this.createEventData.image,
        this.createEventData.image.name
      );
    }

    this.eventService.createEvent(formData).subscribe({
      next: () => {
        this.router.navigateByUrl('/home');
      },
      error: (e) => {
        console.log(e.message);
      },
    });
  }
}
