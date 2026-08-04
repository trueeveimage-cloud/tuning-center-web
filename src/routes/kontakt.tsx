import { createFileRoute } from "@tanstack/react-router";
import { Instagram, Facebook, Mail, Phone } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";

const title = "Kontakta oss — Tuning Center Örebro";
const description =
  "Ring 079 079 00 07 eller mejla Tuningcenter59@gmail.com för bokning och offert på motoroptimering i Örebro.";

export const Route = createFileRoute("/kontakt")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: KontaktPage,
});

function KontaktPage() {
  const mailto = (form: HTMLFormElement) => {
    const fd = new FormData(form);
    const body = `Namn: ${fd.get("namn")}\nTelefon: ${fd.get("telefon")}\nBil: ${fd.get("bil")}\n\n${fd.get("meddelande")}`;
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent("Förfrågan från hemsidan")}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto grid max-w-6xl gap-10 px-4 py-16 lg:grid-cols-2">
        <div>
          <h1 className="text-4xl md:text-5xl">Kontakta oss</h1>
          <p className="mt-3 text-muted-foreground">
            Ring, mejla eller skicka ett DM — vi svarar oftast samma dag.
          </p>

          <div className="mt-8 space-y-3">
            <Button asChild size="lg" className="w-full justify-start bg-heat text-primary-foreground">
              <a href={`tel:${SITE.phone}`}>
                <Phone className="mr-2 size-4" /> {SITE.phoneDisplay}
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full justify-start">
              <a href={`mailto:${SITE.email}`}>
                <Mail className="mr-2 size-4" /> {SITE.email}
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full justify-start">
              <a href={SITE.instagram} target="_blank" rel="noreferrer">
                <Instagram className="mr-2 size-4" /> {SITE.instagramHandle}
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full justify-start">
              <a href={SITE.facebook} target="_blank" rel="noreferrer">
                <Facebook className="mr-2 size-4" /> {SITE.facebookHandle}
              </a>
            </Button>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            mailto(e.currentTarget);
          }}
          className="space-y-4 rounded-xl border border-border bg-surface p-6 md:p-8"
        >
          <h2 className="text-2xl">Skicka en förfrågan</h2>
          {[
            { name: "namn", label: "Namn", type: "text", required: true },
            { name: "telefon", label: "Telefon", type: "tel", required: true },
            { name: "bil", label: "Bilmodell & årsmodell", type: "text", required: false },
          ].map((f) => (
            <div key={f.name} className="space-y-1.5">
              <label htmlFor={f.name} className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                {f.label}
              </label>
              <input
                id={f.name}
                name={f.name}
                type={f.type}
                required={f.required}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </div>
          ))}
          <div className="space-y-1.5">
            <label htmlFor="meddelande" className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Meddelande
            </label>
            <textarea
              id="meddelande"
              name="meddelande"
              rows={5}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </div>
          <Button type="submit" className="w-full bg-heat text-primary-foreground shadow-heat">
            Skicka förfrågan
          </Button>
        </form>
      </main>
      <Footer />
    </div>
  );
}
