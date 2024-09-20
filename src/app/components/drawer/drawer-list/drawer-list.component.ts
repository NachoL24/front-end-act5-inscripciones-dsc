import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
@Component({
  selector: 'app-drawer-list',
  standalone: true,
  imports: [MatIconModule,MatListModule, MatDividerModule],
  templateUrl: './drawer-list.component.html',
  styleUrl: './drawer-list.component.scss'
})
export class DrawerListComponent {
  constructor(private router: Router) {}
  appLinks = [
    { id: 1, name: 'Alumnos', icon: 'calendar_today', link:'/alumnos'},
    { id: 2, name: 'Cursos',   icon: 'people', link:'/cursos'},
    { id: 3, name: 'Inscripcion',  icon: 'attach_money', link:'/inscripcion'},
  ];

}


