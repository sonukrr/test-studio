/* Generated from the Site Blueprint v8. Do not edit — change the site in the studio. */
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ZmCareerSitesLibModule } from "zm-careers-lib";

import { AppComponent } from "./app.component";
import { SectionComponent } from "./section.component";
import { CareersTenantInterceptor } from "./careers-tenant.interceptor";
import { routes } from "./app.routes";
import { HomePageComponent } from "./pages/home/home.component";
import { JobsPageComponent } from "./pages/jobs/jobs.component";
import { JobDetailPageComponent } from "./pages/job-detail/job-detail.component";

/**
 * The library's components inject ActivatedRoute and HttpClient, so a router
 * and an HTTP client have to be present for them to construct at all — which
 * is why RouterModule and HttpClientModule are here even for a page that only
 * shows presentation sections.
 *
 * `ZmCareerSitesLibModule` is the approved component library
 * (zm-careers-lib@2.8.3). Everything functional on
 * this site comes from it; nothing here reimplements a job search.
 */
@NgModule({
  declarations: [
    AppComponent,
    SectionComponent,
    HomePageComponent,
    JobsPageComponent,
    JobDetailPageComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    ZmCareerSitesLibModule,
  ],
  providers: [
    // Pins careers-API traffic to this site's tenant; see the interceptor.
    { provide: HTTP_INTERCEPTORS, useClass: CareersTenantInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
