import {ChangeDetectionStrategy, ChangeDetectorRef, Component, signal} from '@angular/core';
import {DrawerComponent} from "../../components/drawer/drawer.component";
import {MatCardModule} from "@angular/material/card";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatMenuModule} from '@angular/material/menu';
import {MatIcon} from "@angular/material/icon";
import { Course, Student } from "../../models";
import {MatSelectModule} from '@angular/material/select';
import {CursosService, AlumnosService} from "../../services";

@Component({
  selector: 'app-inscripciones',
  standalone: true,
  imports: [
    DrawerComponent,
    MatCardModule,
    MatButton,
    FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatTableModule, MatIcon, MatIconButton, MatMenuModule, MatSelectModule
  ],
  templateUrl: './inscripciones.component.html',
  styleUrl: './inscripciones.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InscripcionesComponent {
  displayedColumns: string[] = ['Course Name', 'Students', 'delete'];
  courses: Course[] = [];
  dataSource = this.courses;
  selectedCourse = signal(0);
  selectedStudent= signal(0);
  students: Student[] = [];


  constructor(private courseService: CursosService, private studentService: AlumnosService, private  cdk: ChangeDetectorRef) {
    this.courseService.getCourses().subscribe(courses => {
      this.courses = courses;
      this.dataSource = this.courses;
      console.log(this.courses);
    });
    this.studentService.getAlumnos().subscribe(students => {
      this.students = students;
    })
  }

  uploadCourse() {
    this.courseService.addStudentToCourse(this.selectedCourse().valueOf(), this.selectedStudent().valueOf()).subscribe(course => {
      this.courseService.getCourses().subscribe(courses => {
        this.courses = courses;
        this.dataSource = this.courses;
        this.cdk.detectChanges();
        this.selectedCourse.set(0);
        this.selectedStudent.set(0);
      });

    });
  }

  delete(studentId: number, event: Event) {
    event.preventDefault();
    event.stopPropagation();
    let element = event.target as HTMLElement;
    let courseId = element.getAttribute('value');
    if(courseId === null) {
      courseId = (element.parentElement as HTMLElement).getAttribute('value');
    }
    this.courseService.deleteStudentFromCourse(courseId, studentId).subscribe(course => {
      this.courseService.getCourses().subscribe(courses => {
        this.courses = courses;
        this.dataSource = this.courses;
        this.cdk.detectChanges();
      });
    });
  }

}
