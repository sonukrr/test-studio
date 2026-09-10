// Generated from the Site Blueprint.
import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home/home.component';
import { JobsPageComponent } from './pages/jobs/jobs.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'jobs', component: JobsPageComponent },
];
