// Generated from the Site Blueprint.
import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home/home.component';
import { JobsPageComponent } from './pages/jobs/jobs.component';
import { JobDetailPageComponent } from './pages/job-detail/job-detail.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'jobs', component: JobsPageComponent },
  { path: 'jobs/:jobUrl', component: JobDetailPageComponent },
];
