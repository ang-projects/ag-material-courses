import {AfterViewInit, Component, OnInit} from '@angular/core';
import {CoursesService} from "../services/courses.service";
import {ActivatedRoute} from "@angular/router";
import {Course} from "../model/course";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})

export class CourseComponent implements OnInit, AfterViewInit {
  course: Course;
  dataSource = new MatTableDataSource([]);
  displayedColumns = ["seqNo", "description", "duration"];

  constructor(private route:ActivatedRoute, private courseService: CoursesService) { }

  ngOnInit(): void {
    this.course = this.route.snapshot.data["course"];
    this.courseService.findAllCourseLessons(this.course.id)
      .subscribe(lessons => this.dataSource.data = lessons);
  }

  ngAfterViewInit(): void {

  }
}
