import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ImageGalleryComponent } from './pages/image-gallery/image-gallery.component';
import { PopupComponent } from './pages/popup/popup.component';
import { TableComponent } from './pages/table/table.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Dashboard', component: DashboardComponent },
  { path: 'image-gallery', component: ImageGalleryComponent },
  { path: 'popup', component: PopupComponent },
  { path: 'table', component: TableComponent }
];