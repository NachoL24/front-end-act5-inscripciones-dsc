import { Routes } from '@angular/router';
import {HomeComponent} from "./layout/home/home.component";
import {AlumnosComponent} from "./layout/alumnos/alumnos.component";
import {CursosComponent} from "./layout/cursos/cursos.component";
import {InscripcionesComponent} from "./layout/inscripciones/inscripciones.component";

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'alumnos', component: AlumnosComponent },
  {path: 'cursos', component: CursosComponent},
  {path: 'inscripcion', component: InscripcionesComponent},
];
