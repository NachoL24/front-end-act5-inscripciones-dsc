import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../../models';
import { environment } from "../../environments";

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {
  private apiUrl = `${environment.apiUrl}/student`;  // Cambia la URL por la de tu backend

  constructor(private http: HttpClient) {}

  // GET: Obtener todos los alumnos
  getAlumnos(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl);
  }

  // GET: Obtener un alumno por ID
  getAlumnoById(id: number): Observable<Student> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Student>(url);
  }

  // POST: Crear un nuevo alumno
  addAlumno(alumno: Student): Observable<Student> {
    return this.http.post<Student>(this.apiUrl, alumno);
  }

  // PUT: Actualizar un alumno existente
  updateAlumno(id: number, alumno: Student): Observable<Student> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Student>(url, alumno);
  }

  // DELETE: Eliminar un alumno por ID
  deleteAlumno(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
