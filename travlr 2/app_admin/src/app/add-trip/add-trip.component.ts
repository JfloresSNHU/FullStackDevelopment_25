import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TripDataService } from '../trip-data.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.css']
})
export class AddTripComponent implements OnInit {
  public addForm!: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private tripService: TripDataService
  ) {}

  ngOnInit(): void {
    this.addForm = this.fb.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      resort: ['', Validators.required],
      length: ['', Validators.required],
      perPerson: [0, Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  onSubmit(): void {
    this.submitted = true;
  
    if (this.addForm.invalid) {
      return;
    }
  
    const trip = this.addForm.value;
    console.log('Submitting trip:', trip); // ✅ DEBUG
  
    this.tripService.addTrip(trip).subscribe({
      next: () => {
        console.log('Trip successfully added'); // ✅ DEBUG
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Trip creation failed:', err);
      }
    });
  }
  
  

  get f() { return this.addForm.controls; }
}
