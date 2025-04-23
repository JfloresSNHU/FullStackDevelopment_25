import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TripDataService } from '../trip-data.service';
import { RouterModule } from '@angular/router';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './edit-trip.component.html'
})
export class EditTripComponent implements OnInit {
  public editForm!: FormGroup;
  submitted = false;
  message = '';
  tripCode!: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripService: TripDataService
  ) {}

  ngOnInit(): void {
    this.tripCode = localStorage.getItem('tripCode') || '';
    if (!this.tripCode) {
      alert('Missing trip code');
      this.router.navigate(['/']);
      return;
    }

    this.editForm = this.formBuilder.group({
      code: [{ value: this.tripCode, disabled: true }],
      name: ['', Validators.required],
      resort: ['', Validators.required],
      length: ['', Validators.required],
      perPerson: [0, Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required],
    });

    this.tripService.getTrips().subscribe({
      next: (trips) => {
        const trip = trips.find(t => t.code === this.tripCode);
        if (trip) {
          this.editForm.patchValue(trip);
        } else {
          this.message = 'Trip not found.';
        }
      },
      error: (err) => {
        console.error('Error retrieving trip:', err);
        this.message = 'Error retrieving trip';
      }
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.editForm.valid) {
      const updatedTrip: Trip = {
        code: this.tripCode,
        ...this.editForm.getRawValue()
      };

      this.tripService.updateTrip(updatedTrip).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Error updating trip:', err);
        }
      });
    }
  }

  get f() { return this.editForm.controls; }
}
