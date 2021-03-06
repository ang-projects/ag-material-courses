import {Component, Input, OnInit} from '@angular/core';
import {Course} from "../model/course";

@Component({
  selector: 'app-courses-card-list',
  templateUrl: './courses-card-list.component.html',
  styleUrls: ['./courses-card-list.component.css']
})
export class CoursesCardListComponent implements OnInit {
  @Input()
  courses: Course[] | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
