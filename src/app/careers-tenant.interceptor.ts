import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { CAREERS } from "./careers.config";

@Injectable()
export class CareersTenantInterceptor implements HttpInterceptor {
  private readonly apiHost = hostOf(CAREERS.apiEndpoint);

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Only careers-API traffic. Anything else the app fetches is its own.
    if (hostOf(request.url) !== this.apiHost) return next.handle(request);

    let updated = request;

    // The search and the apply flow send their tenant as multipart fields.
    if (request.body instanceof FormData) {
      const body = request.body;
      if (body.has("domain")) body.set("domain", CAREERS.domain);
      if (body.has("companyId")) body.set("companyId", CAREERS.companyId);
      updated = updated.clone({ body });
    } else if (request.body && typeof request.body === "object" && !Array.isArray(request.body)) {
      const body: Record<string, any> = { ...(request.body as Record<string, any>) };
      let touched = false;
      if ("domain" in body) {
        body["domain"] = CAREERS.domain;
        touched = true;
      }
      if ("companyId" in body) {
        body["companyId"] = CAREERS.companyId;
        touched = true;
      }
      if (touched) updated = updated.clone({ body });
    }

    // Some reads carry it in the query string instead.
    let params = updated.params;
    if (params.has("domain")) params = params.set("domain", CAREERS.domain);
    if (params.has("companyId")) params = params.set("companyId", CAREERS.companyId);
    if (params !== updated.params) updated = updated.clone({ params });

    /*
      The library sets TenantGroupId from localStorage.tenantId, which nothing
      seeds. The search works without it, so it is only sent when configured —
      sending a wrong group id is worse than sending none.
    */
    if (CAREERS.tenantGroupId && !updated.headers.has("TenantGroupId")) {
      updated = updated.clone({
        headers: updated.headers.set("TenantGroupId", CAREERS.tenantGroupId),
      });
    }

    return next.handle(updated);
  }
}

function hostOf(url: string): string {
  try {
    return new URL(url, window.location.origin).host;
  } catch {
    return "";
  }
}
