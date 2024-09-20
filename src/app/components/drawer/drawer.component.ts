import { Component, Inject } from '@angular/core';
import { ToolbarComponent } from "../../../../../../../desarrollo de software/ProyectoGym/FrontEnd/src/app/src/components/toolbar/toolbar.component";
import { MatSidenavModule } from '@angular/material/sidenav';
import { DrawerListComponent } from "./drawer-list/drawer-list.component";
import { MatIconModule } from '@angular/material/icon';
import { DOCUMENT } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';
import { MatButtonModule } from '@angular/material/button';
import { UserProfileComponent } from "../../../../../../../desarrollo de software/ProyectoGym/FrontEnd/src/app/src/components/user-profile/user-profile.component";

@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [MatButtonModule, ToolbarComponent, MatSidenavModule, DrawerListComponent, MatIconModule, UserProfileComponent],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.scss'
})
export class DrawerComponent {

}
