import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../../models';
import { environment } from "../../environments";

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private apiUrl = `${environment.apiUrl}/course`;  // Cambia la URL por la de tu backend

  constructor(private http: HttpClient) {}

  // GET: Obtener todos los cursos
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl);
  }

  // GET: Obtener un curso por ID
  getCourseById(id: number): Observable<Course> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Course>(url);
  }

  addStudentToCourse(courseId: number, studentId: number): Observable<Course> {
    const url= `${this.apiUrl}/${courseId}/student/${studentId}`;
    return this.http.get<Course>(url);
  }

  // POST: Crear un nuevo curso
  addCourse(curso: Course): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, curso);
  }

  // PUT: Actualizar un curso existente
  updateCourse(id: number, curso: Course): Observable<Course> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Course>(url, curso);
  }

  // DELETE: Eliminar un curso por ID
  deleteCourse(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  deleteStudentFromCourse(courseId: string | null, studentId: number) {
    const url = `${this.apiUrl}/${courseId}/student/${studentId}`;
    return this.http.delete<void>(url);
  }
}
