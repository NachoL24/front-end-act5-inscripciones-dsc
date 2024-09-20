import {ChangeDetectionStrategy, ChangeDetectorRef, Component, signal} from '@angular/core';
import {DrawerComponent} from "../../components/drawer/drawer.component";
import {MatCardModule} from "@angular/material/card";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import { Course } from '../../models';
import {MatIcon} from "@angular/material/icon";
import { CursosService } from "../../services";
import {MatMenuModule} from "@angular/material/menu";

/*const courses: Course[] = [
  {
    id: 1,
    name: 'Analisis matematico',
    description: 'Curso de analisis matematico',
    capacity: 10,
    students: []
  },
  {
    id: 2,
    name: 'Algebra',
    description: 'Curso de algebra',
    capacity: 15,
    students: [],
  },
  {
    id: 3,
    name: 'Desarrollo por componentes',
    description: 'Curso de desarrollo por componentes',
    capacity: 20,
    students: [],
  },
  {
    id: 4,
    name: 'Base de datos',
    description: 'Curso de base de datos',
    capacity: 25,
    students: [],
  },
];*/


@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [
    DrawerComponent,
    MatCardModule,
    MatButton,
    FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatTableModule, MatIcon, MatIconButton, MatMenuModule
  ],
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CursosComponent {
   courses: Course[] = [];
   course = signal<Course>({
      name: '',
      description: '',
      capacity: 0,
   });
  dataSource = this.courses;

  constructor(private cursosService: CursosService, private cdk: ChangeDetectorRef) {
    this.cursosService.getCourses().subscribe((data: Course[]) => {
      this.courses = data;
      this.dataSource = [...this.courses];
      console.log('Cursos cargados:', this.courses);
    });
  }

  displayedColumns: string[] = ['Course Name', 'Description', 'capacity', 'N° Students', 'delete'];

  uploadCourse() {
    const newCourse: Course = this.course();
    this.cursosService.addCourse(newCourse).subscribe(course => {
      this.cursosService.getCourses().subscribe((data: Course[]) => {
        this.courses = data;
        this.dataSource = [...this.courses];
        console.log('Cursos cargados:', this.courses);
        this.course.set({
          name: '',
          description: '',
          capacity: 0,
        });

      });
    });
  }

  delete(id: number) {
    this.cursosService.deleteCourse(id).subscribe(() => {
      this.cursosService.getCourses().subscribe((data: Course[]) => {
        this.courses = data;
        this.dataSource = [...this.courses];
        console.log('Cursos cargados:', this.courses);
        this.cdk.detectChanges();
      });
    });
  }

  vaciar() {
    this.course.set({
      name: '',
      description: '',
      capacity: 0,
    })
  }

  updateCourse() {
    const newCourse: Course = this.course();
    this.cursosService.updateCourse(this.course().id!, newCourse).subscribe(course => {
      this.cursosService.getCourses().subscribe((data: Course[]) => {
        this.courses = data;
        this.dataSource = [...this.courses];
        console.log('Cursos cargados:', this.courses);
        this.course.set({
          name: '',
          description: '',
          capacity: 0,
        });
        this.cdk.detectChanges();
      });
    });
  }

  edit(id:number) {
    const course = this.courses.find(course => course.id === id);
    this.course.set(course!);
  }
}
