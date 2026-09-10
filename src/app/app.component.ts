import { Component } from "@angular/core";

/** The shell. Every page is a route, so there is nothing else to render here. */
@Component({
  selector: "app-root",
  template: "<router-outlet></router-outlet>",
})
export class AppComponent {}
