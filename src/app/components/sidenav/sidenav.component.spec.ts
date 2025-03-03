import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common'; // Add this
import { SidenavService } from '../../services/sidenav.service';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [RouterLink, CommonModule], // Add CommonModule here
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  @Input() isOpen: boolean = false;

  constructor(private sidenavService: SidenavService) {}

  close() {
    this.sidenavService.close();
  }
}