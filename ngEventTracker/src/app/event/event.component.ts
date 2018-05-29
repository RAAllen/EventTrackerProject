import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { forEach } from '@angular/router/src/utils/collection';
import { ERROR_COLLECTOR_TOKEN } from '@angular/platform-browser-dynamic/src/compiler_factory';

import { Activity } from '../models/activity';
import { EventDataService } from '../event-data.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  activities: Activity[] = [];

  activity = new Activity();

  editActivity = null;

  selected = null;

  // END OF FIELDS

  load() {
    this.eventDataService.index().subscribe(
      data => this.activities = data,
      err => console.error('The following error occurred: ' + err)
    );
  }

  displayActivity = function(activity) {
    this.selected = activity;
  };

  displayActivityTable = function() {
    this.selected = null;
  };

  setEditActivity = function () {
    this.editActivity = Object.assign({}, this.selected);
  };

  hideEditActivity = function() {
    this.editActivity = null;
  };

  addActivity = function() {
    this.eventDataService.create(this.activity).subscribe(
      data => {
        this.reload();
        this.activity = new Activity();
      },
      err => console.log(err)
    );
  };

  updateActivity = function(activity) {
    this.eventDataService.update(activity).subscribe(
      data => {
        this.load();
        this.selected = null;
        this.editActivity = null;
      },
      err => console.log(err)
    );
  };

  deleteActivity = function(id) {
    this.eventDataService.destroy(id).subscribe(
      data => this.load(),
      err => console.log(err)
    );
  };

  // END OF METHODS

  constructor(
    private eventDataService: EventDataService
  ) { }

  ngOnInit() {
    this.load();
  }

}
