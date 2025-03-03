import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { ImageGalleryService, GalleryImage } from '../../services/image-gallery.service';

@Component({
  selector: 'app-image-gallery',
  standalone: true,
  imports: [CommonModule, CarouselModule, ButtonModule, TagModule],
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.css']
})
export class ImageGalleryComponent implements OnInit {
  galleryImages: GalleryImage[] = [];
  loading = true;
  openClosures: boolean[] = [false, false, false, false, false];
  responsiveOptions = [
    { breakpoint: '1024px', numVisible: 3, numScroll: 1 },
    { breakpoint: '768px', numVisible: 2, numScroll: 1 },
    { breakpoint: '560px', numVisible: 1, numScroll: 1 }
  ];

  constructor(private imageGalleryService: ImageGalleryService) {}

  ngOnInit() {
    this.fetchImages();
  }

  fetchImages() {
    this.loading = true;
    this.imageGalleryService.getImages().subscribe({
      next: (images) => {
        this.galleryImages = images;
        this.loading = false;
      },
      error: (err) => {
        console.error('API Error:', err);
        this.galleryImages = [];
        this.loading = false;
      }
    });
  }

  toggleClosure(index: number) {
    this.openClosures[index] = !this.openClosures[index];
  }

  getClosureImages(index: number): GalleryImage[] {
    const itemsPerClosure = Math.ceil(this.galleryImages.length / 5);
    const start = index * itemsPerClosure;
    const end = start + itemsPerClosure;
    return this.galleryImages.slice(start, end);
  }
}