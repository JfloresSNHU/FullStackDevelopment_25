import { Routes } from '@angular/router';
import { TripListingComponent } from './trip-listing/trip-listing.component';
import { AddTripComponent } from './add-trip/add-trip.component';
import { EditTripComponent } from './edit-trip/edit-trip.component';
import { LoginComponent } from './login/login.component';
import { TravelComponent } from './travel/travel.component'; // <- You’ll need to create this
import { AdminComponent } from './admin/admin.component';     // <- Optional, for admin dashboard
import { AuthGuard } from './services/auth.guard';
import { AdminGuard } from './services/admin.guard';          // <- You'll need to create this
import { DummyComponent } from './shared/dummy/dummy.component';    // <- Generic placeholder
import { SignupComponent } from './signup/signup.component';


export const routes: Routes = [
  { path: '', component: TripListingComponent },

  // Travel filtering/search
  { path: 'travel', component: TravelComponent },

  { path: 'signup', component: SignupComponent },

  // Admin area (guarded)
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard, AdminGuard] },

  // Admin add/edit (guarded)
  { path: 'add-trip', component: AddTripComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'edit-trip', component: EditTripComponent, canActivate: [AuthGuard, AdminGuard] },

  // Auth routes
  { path: 'login', component: LoginComponent },

  // Dummy placeholder routes
  { path: 'reservations', component: DummyComponent, canActivate: [AuthGuard] },
  { path: 'news', component: DummyComponent },
  { path: 'checkout', component: DummyComponent },

  // Fallback route
  { path: '**', redirectTo: '' }
];
