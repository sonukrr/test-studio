// Generated from the Site Blueprint.
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-jobs',
  templateUrl: './jobs.component.html',
})
export class JobsPageComponent {
  constructor(private readonly router: Router) {}

  /**
   * Opens the job a card was clicked on.
   *
   * lib-jobs-list emits "<slug>?id=<n>" and navigates nowhere, so this is
   * what makes a job card work. The two halves go to different places on
   * purpose: the slug becomes the route parameter because lib-job-apply
   * reads paramMap.get('jobUrl'), and everything after the ? stays in the
   * query because lib-job-view reads the id from queryParams.
   */
  openJob(emitted: string): void {
    const [slug, query] = String(emitted ?? '').split('?');
    if (!slug) return;

    const queryParams: Record<string, string> = {};
    new URLSearchParams(query ?? '').forEach((value, key) => {
      queryParams[key] = value;
    });

    void this.router.navigate(['jobs', slug], { queryParams });
  }
}
