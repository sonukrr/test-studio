/* Generated from the Site Blueprint v8. Do not edit — change the site in the studio. */

export interface NavLink {
  label: string;
  /** Empty when the blueprint's navigation item points nowhere yet. */
  href: string;
}

export const site: { name: string; tagline: string; nav: NavLink[] } = {
  name: "Zwayam",
  tagline: "The future of Zwayam starts with you",
  nav: [
    {
      "label": "Home",
      "href": "/"
    },
    {
      "label": "Jobs",
      "href": "/jobs"
    }
  ],
};
