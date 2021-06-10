import {Component, OnInit} from '@angular/core';
import {Course} from "../model/course";
import {COURSES} from "../model/db-data";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  beginnerCourses: Course[] | undefined;

  advancedCourses: Course[] | undefined;

  constructor() {
  }

  ngOnInit(): void {
    const courses = <any>Object.values(COURSES);

    this.beginnerCourses = courses.filter((course: { category: string; }) => course.category === 'BEGINNER');

    this.advancedCourses = courses.filter((course: { category: string; }) => course.category === 'ADVANCED');
  }

}
