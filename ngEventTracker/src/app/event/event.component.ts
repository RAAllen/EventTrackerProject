import { Component, OnInit } from '@angular/core';
import { Activity } from '../models/activity';
import { EventDataService } from '../event-data.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  activities: Activity[] = [];

  // END OF FIELDS

  load() {
    this.eventDataService.index().subscribe(
      data => this.activities = data,
      err => console.error('The following error occurred: ' + err)
    );
  }

  // END OF METHODS

  constructor(
    private eventDataService: EventDataService
  ) { }

  ngOnInit() {
    this.load();
  }

}
