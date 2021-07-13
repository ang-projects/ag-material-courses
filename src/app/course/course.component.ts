import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CoursesService} from "../services/courses.service";
import {ActivatedRoute} from "@angular/router";
import {Course} from "../model/course";
import {MatTableDataSource} from "@angular/material/table";
import {DataSource} from "@angular/cdk/collections";
import {LessonsDataSource} from "../services/lessons.datasource";
import {MatPaginator} from "@angular/material/paginator";
import {debounce, debounceTime, distinctUntilChanged, startWith, tap} from "rxjs/operators";
import {MatSort} from "@angular/material/sort";
import {fromEvent, merge} from "rxjs";


@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})

export class CourseComponent implements OnInit, AfterViewInit {
  course: Course;
  dataSource: LessonsDataSource;
  displayedColumns = ["seqNo", "description", "duration"];

  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;
  @ViewChild('input')
  input: ElementRef;

  constructor(private route:ActivatedRoute, private courseService: CoursesService) { }

  ngOnInit(): void {
    this.course = this.route.snapshot.data["course"];
    this.dataSource = new LessonsDataSource(this.courseService);
    this.dataSource.loadLessons(this.course.id, '', 'asc', 0, 4);
  }

  ngAfterViewInit(): void {
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadLessonsPage();
        })
      ).subscribe();

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
       tap(() => this.loadLessonsPage())
      )
      .subscribe()
  }
  loadLessonsPage() {
    this.dataSource.loadLessons(this.course.id,
      this.input.nativeElement.value,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize)
  }
}
