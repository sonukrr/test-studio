/**
 * The tenant identity `zm-careers-lib` runs against.
 *
 * The library is configured through browser storage rather than Angular DI:
 * `ServerApiService` reads `sessionStorage.APIENDPOINTNEW` in its constructor,
 * `DataStoreService` reads `COMPANYID`, and `CommonService` reads `DOMAIN` and
 * `COMPANYURL`. All of it has to be in place before Angular bootstraps, which
 * is why main.ts calls this first and why this file imports nothing.
 *
 * Off localhost the library ignores `domain` and `companyUrl` and derives both
 * from `location.hostname` instead — which on a deployment URL is a domain the
 * careers API has never heard of, and it answers those with 200 and no jobs.
 * `CareersTenantInterceptor` puts these values back on every outgoing request
 * so the deployed site shows the same roles as the studio preview. Change the
 * tenant here and both the storage seeding and the interceptor follow.
 */
export const CAREERS = {
  companyId: "MTY4ODE=",
  companyUrl: "dHJpYW56ZGlnaXRhbC5wcmVwcm9kMS5vcGVuaW5ncy5jby9tYW5hZ2U=",
  domain: "trianzdigital.preprod1.openings.co",
  apiEndpoint: "https://apipreprod1.zwayam.com/",
  /**
   * Sent as the TenantGroupId header when set. The library reads it from
   * `localStorage.tenantId`, which nothing seeds; search works without it, so
   * it stays empty until someone confirms the right value for this tenant.
   */
  tenantGroupId: "",
} as const;

export function applyCareersConfig(): void {
  sessionStorage.setItem("APIENDPOINT", CAREERS.apiEndpoint);
  sessionStorage.setItem("APIENDPOINTNEW", CAREERS.apiEndpoint);
  sessionStorage.setItem("TENANTAPIURL", CAREERS.apiEndpoint.replace(/\/+$/, ""));

  sessionStorage.setItem("COMPANYID", CAREERS.companyId);
  sessionStorage.setItem("COMPANYURL", CAREERS.companyUrl);
  sessionStorage.setItem("DOMAIN", CAREERS.domain);
}
