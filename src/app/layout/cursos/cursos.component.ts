import { ChangeDetectionStrategy, Component } from '@angular/core';
import {DrawerComponent} from "../../components/drawer/drawer.component";
import {MatCardModule} from "@angular/material/card";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import { Course } from '../../models';
import {MatIcon} from "@angular/material/icon";

const courses: Course[] = [
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
];


@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [
    DrawerComponent,
    MatCardModule,
    MatButton,
    FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatTableModule, MatIcon, MatIconButton
  ],
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CursosComponent {
  displayedColumns: string[] = ['Course Name', 'Description', 'capacity', 'N° Students', 'delete'];
  dataSource = courses;

  uploadCourse() {
    alert("Cargando alumno");
  }

  delete(id: number) {
    alert("Eliminando curso de id: " + id);
  }
}
