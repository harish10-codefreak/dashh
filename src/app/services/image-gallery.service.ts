import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface GalleryImage {
  id: string;
  url: string;
  title: string;
}

@Injectable({
  providedIn: 'root'
})
export class ImageGalleryService {
  private apiUrl = 'https://api.unsplash.com/photos/random?count=10&client_id=YOUR_ACCESS_KEY';

  constructor(private http: HttpClient) {}

  getImages(): Observable<GalleryImage[]> {
    const mockImages: GalleryImage[] = [
      { id: '1', url: 'https://images.unsplash.com/photo-1616788494707-ec28f08d05a1', title: 'Mountain View' },
      { id: '2', url: 'https://images.unsplash.com/photo-1519125323398-675f398f6978', title: 'Ocean Breeze' },
      { id: '3', url: 'https://images.unsplash.com/photo-1521747116042-5a81051f1171', title: 'Forest Path' },
      { id: '4', url: 'https://images.unsplash.com/photo-1549880338-65ddcdfd017b', title: 'Sunset Glow' },
      { id: '5', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c', title: 'City Lights' },
      { id: '6', url: 'https://images.unsplash.com/photo-1574169208507-1b4b1a5a1b2e', title: 'Red Dawn' },
      { id: '7', url: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0', title: 'Blue Horizon' },
      { id: '8', url: 'https://images.unsplash.com/photo-1517816746078-8e9e', title: 'Green Valley' },
      { id: '9', url: 'https://images.unsplash.com/photo-1522771739844-6a9f6d', title: 'Yellow Fields' },
      { id: '10', url: 'https://images.unsplash.com/photo-1503437313881-2d95', title: 'Purple Sky' }
    ];
    return of(mockImages).pipe(delay(1000));
  }
}