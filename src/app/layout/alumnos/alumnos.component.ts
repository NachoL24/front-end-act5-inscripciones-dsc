import {ChangeDetectionStrategy, ChangeDetectorRef, Component, signal, ViewChild} from '@angular/core';
import { DrawerComponent } from "../../components/drawer/drawer.component";
import { MatCardModule } from "@angular/material/card";
import { MatButton, MatIconButton } from "@angular/material/button";
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { Student } from '../../models';
import { MatIcon } from "@angular/material/icon";
import { AlumnosService } from "../../services";
import {MatMenuModule} from '@angular/material/menu';

@Component({
  selector: 'app-alumnos',
  standalone: true,
  imports: [
    DrawerComponent,
    MatCardModule,
    MatButton,
    FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatTableModule, MatIcon, MatIconButton, MatMenuModule,
  ],
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AlumnosComponent {
  students: Student[] = [];
  student = signal<Student>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
  });
  dataSource = this.students;
  @ViewChild('rpassword') rpasswordInput: any;
  constructor(private alumnoService: AlumnosService, private cdr: ChangeDetectorRef) {
    this.alumnoService.getAlumnos().subscribe((data: Student[]) => {
      this.students = data;
      this.dataSource = [...this.students]; // Actualiza la tabla
      console.log('Alumnos cargados:', this.students);
    });
  }

  displayedColumns: string[] = ['first name', 'last name', 'email', 'phone', 'edit'];

  uploadStudent(password: string, repassword: string) {
    if (password !== repassword) {
      alert('Las contraseñas no coinciden, usuario: '+ this.student().firstName + ' no creado');
      console.dir(this.student());
      return;
    }
    const newStudent: Student = this.student();
    this.alumnoService.addAlumno(newStudent).subscribe(student => {
      /*this.students.push(student);*/
      this.alumnoService.getAlumnos().subscribe((data: Student[]) => {
        this.students = data;
        this.dataSource = [...this.students]; // Actualiza la tabla
        this.cdr.detectChanges();
        console.log('Alumnos cargados:', this.students);
        this.student.set({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          password: '',
        });
        this.rpasswordInput.nativeElement.value = '';
      });
      /*this.dataSource = [...this.students]; // Actualiza la tabla*/
    });
  }

  delete(id: number) {
    this.alumnoService.deleteAlumno(id).subscribe(() => {
      this.students = this.students.filter(student => student.id !== id);
      this.dataSource = [...this.students]; // Actualiza la tabla
      this.cdr.detectChanges();
    });
  }

  edit(id: number) {
    const student = this.students.find(student => student.id === id);
    this.student.set(student!);

  }

  vaciar() {
    this.student.set({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
    });
    this.rpasswordInput.nativeElement.value = '';
  }

  updateStudent(value: string, value2: string) {
    if (value !== value2) {
      alert('Las contraseñas no coinciden, usuario: ' + this.student().firstName + ' no actualizado');
      console.dir(this.student());
      return;
    } else {
      this.alumnoService.updateAlumno(this.student().id!, this.student()).subscribe(() => {
        this.alumnoService.getAlumnos().subscribe((data: Student[]) => {
          this.students = data;
          this.dataSource = [...this.students]; // Actualiza la tabla
          this.cdr.detectChanges();
          console.log('Alumnos cargados:', this.students);
          this.student.set({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            password: '',
          });
          this.rpasswordInput.nativeElement.value = '';
        });
      });
    }
  }
}
