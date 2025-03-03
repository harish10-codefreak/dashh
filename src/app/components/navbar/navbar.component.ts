import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavService } from '../../services/sidenav.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  showProfilePopup = false;

  constructor(private sidenavService: SidenavService) {}

  toggleSidenav() {
    this.sidenavService.toggle();
    this.showProfilePopup = false; // Close popup when opening sidenav
  }

  toggleProfilePopup(event: MouseEvent) {
    event.stopPropagation(); // Prevent event from bubbling up
    this.showProfilePopup = !this.showProfilePopup;
  }

  @HostListener('document:click', ['$event'])
  closePopupOnOutsideClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const clickedInside = target.closest('.profile-icon') || target.closest('.profile-popup');
    if (!clickedInside && this.showProfilePopup) {
      this.showProfilePopup = false;
    }
  }
}