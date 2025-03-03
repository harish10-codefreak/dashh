import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent {
  popupForm: FormGroup;
  submitted = false;
  showSuccess = false;

  constructor(private fb: FormBuilder) {
    this.popupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      number: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
    });
  }

  onSubmit() {
    if (this.popupForm.valid) {
      this.submitted = true;
      this.showSuccess = true;
      console.log('Form Submitted:', this.popupForm.value);
      // Reset form after submission (optional)
      this.popupForm.reset();
      // Hide success message after 3 seconds
      setTimeout(() => {
        this.showSuccess = false;
      }, 3000);
    }
  }
}