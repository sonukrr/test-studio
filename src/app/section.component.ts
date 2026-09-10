import { Component, HostBinding, Input } from "@angular/core";
import { site } from "./site.config";

@Component({
  selector: "app-section",
  templateUrl: "./section.component.html",
  styleUrls: ["./section.component.scss"],
})
export class SectionComponent {
  /** The static section type: hero, benefits, footer, and so on. */
  @Input() type = "";
  @Input() sectionId = "";
  @Input() label = "";
  @Input() content: Record<string, any> = {};

  readonly year = new Date().getFullYear();
  readonly companyName = site.name;
  readonly tagline = site.tagline;
  readonly nav = site.nav;

  /** Replica stylesheets are scoped to this attribute; harmless elsewhere. */
  @HostBinding("attr.data-section-id") get hostSectionId(): string | null {
    return this.sectionId || null;
  }

  /** Content lookup with a fallback, so a missing field never renders "undefined". */
  value(key: string, fallback = ""): string {
    const raw = this.content?.[key];
    return typeof raw === "string" && raw.trim() ? raw : fallback;
  }

  get items(): Record<string, any>[] {
    const raw = this.content?.["items"];
    return Array.isArray(raw) ? raw : [];
  }

  /** Images were rewritten into /assets/ when the site was generated. */
  image(key = "image"): string {
    return this.value(key);
  }

  imageAlt(key = "image"): string {
    return this.value(key + "Alt") || this.value("headline") || this.label;
  }

  itemImage(item: Record<string, any>, key: string): string {
    const raw = item?.[key];
    return typeof raw === "string" ? raw : "";
  }

  itemAlt(item: Record<string, any>, key: string): string {
    return String(item?.[key + "Alt"] ?? item?.["name"] ?? item?.["city"] ?? "");
  }

  /** Both stock licences require attribution while the image is on screen. */
  credit(key = "image"): { text: string; url: string } | null {
    const raw = this.content?.[key + "Credit"];
    return raw && typeof raw === "object" ? (raw as { text: string; url: string }) : null;
  }
}
