import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  Facebook,
  Fuel,
  Gauge,
  Instagram,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Star,
  Wrench,
  Zap,
} from "lucide-react";
import heroImg from "@/assets/hero-tuning.jpg";
import workshopBmw from "@/assets/workshop-bmw.png";
import workshopMercedes from "@/assets/workshop-mercedes.webp";
import workshopVan from "@/assets/workshop-service-van.webp";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ParallaxHeroImage } from "@/components/site/ParallaxHeroImage";
import { EffectCalculator } from "@/components/site/EffectCalculator";
import { BrandMark } from "@/components/site/BrandLogo";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";

const title = "Tuning Center Örebro | Motoroptimering & chiptuning";
const description =
  "Professionell motoroptimering, bilservice och programmering i Kumla nära Örebro. Räkna ut din effektökning direkt med vår tuningkalkylator.";

export const Route = createFileRoute("/")({
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
  component: Index,
});

const services = [
  {
    icon: Gauge,
    number: "01",
    title: "Motoroptimering",
    text: "Steg 1, 2 och 3 med mjukvara anpassad efter din bil, hårdvara och körstil.",
  },
  {
    icon: Fuel,
    number: "02",
    title: "Växellådsoptimering",
    text: "Optimerade växlingspunkter, snabbare växlingar och bättre samspel med motorn.",
  },
  {
    icon: Wrench,
    number: "03",
    title: "Felsökning & kodning",
    text: "Diagnos, kodning och programmering av styrenheter med tydlig återkoppling.",
  },
  {
    icon: ShieldCheck,
    number: "04",
    title: "VAG & BMW",
    text: "Märkesspecifik kodning, programmering och FRM-reparation efter bilens behov.",
  },
];

const reviews = [
  {
    name: "POSKIS",
    text: "Kan starkt rekommendera att åka hit om man har problem med bilens system! Gick knappt 24 timmar ifrån att man ringde till att problemet var löst. Väldigt serviceminded och kompetent!",
  },
  {
    name: "Stefan Wahlstrom",
    text: "Bra service, snabbt svar, bra kunskap på området, fick tips på saker att hålla koll på, uppskattas, trevlig kille kan verkligen rekommendera.",
  },
  {
    name: "Dimitrios Tsikourlis",
    text: "Öppen och transparent gällande min optimering och vad jag kunde förvänta mig. Det kändes tryggt och jag är tok nöjd över mitt besök. Kommer återkomma!",
  },
];

const workshopPhotos = [
  {
    src: workshopBmw,
    alt: "BMW efter arbete hos Tuning Center i Kumla",
    className: "md:col-span-2 md:row-span-2",
  },
  { src: workshopMercedes, alt: "Mercedes i Tuning Centers verkstad", className: "" },
  { src: workshopVan, alt: "Servicebil inne i Tuning Centers verkstad", className: "" },
];

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="relative isolate min-h-[calc(100svh-4.5rem)] overflow-hidden pb-24 sm:pb-28">
          <ParallaxHeroImage src={heroImg} alt="Sportbil i verkstad hos Tuning Center Örebro" />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(250,247,239,.97)_0%,rgba(250,247,239,.88)_28%,rgba(250,247,239,.42)_52%,rgba(250,247,239,0)_78%)]" />
          <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-background via-background/70 to-transparent" />
          <div className="absolute -right-24 top-10 -z-10 h-[32rem] w-[10rem] rotate-12 bg-primary/10 blur-3xl" />

          <div className="mx-auto flex min-h-[calc(100svh-4.5rem)] max-w-7xl items-center px-4 py-20 sm:px-6">
            <div className="max-w-3xl reveal-up">
              <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-border bg-background/85 px-4 py-2.5 shadow-sm backdrop-blur">
                <BrandMark className="size-9" />
                <span className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Service · Programmering · Optimering
                </span>
              </div>
              <p className="section-kicker">
                <span className="h-px w-8 bg-primary" /> Motoroptimering i Kumla
              </p>
              <h1 className="mt-5 text-[clamp(3.25rem,9vw,7.5rem)] leading-[0.82] tracking-[-0.025em]">
                Släpp loss
                <br />
                <span className="text-heat">din motor.</span>
              </h1>
              <p className="mt-7 max-w-xl text-base leading-7 text-foreground/75 sm:text-lg">
                Skräddarsydd optimering för mer effekt, högre vridmoment och skarpare respons.
                Utvecklad för din bil, utförd lokalt i Kumla.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="h-12 rounded-full bg-heat px-7 font-semibold shadow-heat hover:-translate-y-0.5"
                >
                  <Link to="/kalkylator">
                    Räkna på din bil <ArrowRight />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-12 rounded-full border-foreground/20 bg-background/80 px-7 backdrop-blur hover:-translate-y-0.5"
                >
                  <a href={`mailto:${SITE.email}`}>
                    <Mail /> Skicka ett mail
                  </a>
                </Button>
              </div>
              <div className="mt-9 flex flex-wrap gap-x-6 gap-y-2 text-xs uppercase tracking-wider text-foreground/65">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-primary" /> Anpassad mjukvara
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-primary" /> Tydliga besked
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-primary" /> Lokal service
                </span>
              </div>
            </div>
          </div>

          <div className="absolute bottom-28 right-0 hidden rounded-l-xl border-y border-l border-border bg-background/85 backdrop-blur md:block">
            <div className="flex items-center gap-5 px-8 py-5">
              <span className="font-display text-4xl text-primary">5.0</span>
              <span className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                Kundernas
                <br />
                snittbetyg
              </span>
            </div>
          </div>
        </section>

        <section className="relative z-10 -mt-20 sm:-mt-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border/70 shadow-[0_34px_80px_-48px_rgba(41,32,24,.65)] lg:grid-cols-4">
              {[
                ["1000+", "Optimerade bilar"],
                ["+25%", "Typisk effektökning"],
                ["Steg 1–2", "Individuell tuning"],
                ["Kumla", "Lokal verkstad"],
              ].map(([value, label]) => (
                <div key={label} className="bg-surface/95 px-4 py-6 backdrop-blur sm:px-7 sm:py-8">
                  <p className="font-display text-3xl text-foreground sm:text-4xl">{value}</p>
                  <p className="mt-1 text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>


        <section className="scroll-reveal bg-surface">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24">
            <div className="grid items-end gap-6 lg:grid-cols-[1fr_0.8fr]">
              <div>
                <p className="section-kicker">
                  <span className="h-px w-8 bg-primary" /> Från verkstadsgolvet
                </p>
                <h2 className="mt-3 text-4xl leading-none sm:text-5xl">
                  Riktiga bilar.
                  <br />
                  <span className="text-heat">Riktigt arbete.</span>
                </h2>
              </div>
              <p className="max-w-xl leading-7 text-muted-foreground">
                Här arbetar vi med allt från service, reparationer och stora mekaniska jobb till
                programmering och motoroptimering steg 1–3.
              </p>
            </div>
            <div className="mt-10 grid auto-rows-[15rem] gap-4 md:auto-rows-[18rem] md:grid-cols-3">
              {workshopPhotos.map((photo) => (
                <figure
                  key={photo.src}
                  className={`group relative overflow-hidden rounded-xl border border-border bg-background shadow-[0_20px_48px_-38px_rgba(41,32,24,.7)] ${photo.className}`}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    loading="lazy"
                    className="size-full object-cover contrast-[1.08] saturate-[1.05] transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-75" />
                </figure>
              ))}
            </div>
          </div>
        </section>


        <section className="scroll-reveal mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="section-kicker">
                <span className="h-px w-8 bg-primary" /> Vad vi gör
              </p>
              <h2 className="mt-3 text-4xl leading-none sm:text-5xl">
                Prestanda med <span className="text-muted-foreground">precision.</span>
              </h2>
            </div>
            <Button asChild variant="link" className="px-0 text-primary">
              <Link to="/tjanster">
                Utforska alla tjänster <ArrowRight />
              </Link>
            </Button>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <article
                key={service.title}
                className="card-premium card-premium-hover card-sheen group min-h-64 p-6"
              >
                <span className="font-display text-sm text-muted-foreground">{service.number}</span>
                <service.icon className="mt-7 size-8 text-primary transition-transform group-hover:-translate-y-1" />
                <h3 className="mt-6 text-2xl">{service.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{service.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="scroll-reveal grid-lines relative overflow-hidden border-y border-border bg-surface-2/45">
          <div className="absolute inset-0 bg-gradient-to-r from-background/85 via-background/35 to-background/85" />
          <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24">
            <div className="max-w-2xl">
              <p className="section-kicker">
                <Zap className="size-4" /> Direkt uppskattning
              </p>
              <h2 className="mt-3 text-4xl leading-none sm:text-5xl">
                Hur mycket finns <span className="text-heat">under huven?</span>
              </h2>
              <p className="mt-4 text-muted-foreground">
                Sök med registreringsnummer eller välj bil och motor för att se möjlig effekt och
                vridmoment efter optimering.
              </p>
            </div>
            <div className="mt-10">
              <EffectCalculator />
            </div>
          </div>
        </section>

        <section className="scroll-reveal mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="section-kicker">
                <span className="h-px w-8 bg-primary" /> Kundernas ord
              </p>
              <h2 className="mt-3 text-4xl sm:text-5xl">Resultat som märks.</h2>
            </div>
            <div className="hidden items-center gap-2 sm:flex">
              <Star className="size-5 fill-primary text-primary" />
              <span className="font-display text-2xl">5.0</span>
            </div>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {reviews.map((review) => (
              <figure
                key={review.name}
                className="card-premium card-premium-hover card-sheen p-7"
              >
                <div className="flex gap-1 text-primary">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="size-4 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-6 text-base leading-7 text-foreground/80">
                  “{review.text}”
                </blockquote>
                <figcaption className="mt-6 border-t border-border pt-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  {review.name} · Google-recension
                </figcaption>
              </figure>
            ))}
          </div>
        </section>


        <section className="scroll-reveal bg-background">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24">
            <div className="grid-lines relative overflow-hidden rounded-2xl bg-cta-panel px-6 py-12 text-cta-panel-foreground shadow-[0_40px_90px_-50px_rgba(41,32,24,.9)] sm:px-12 sm:py-16">
              <div className="absolute -right-16 -top-16 size-64 rounded-full bg-primary/25 blur-3xl" />
              <div className="relative grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
                <div>
                  <p className="section-kicker">
                    <span className="h-px w-8 bg-primary" /> Kontakta oss
                  </p>
                  <h2 className="mt-3 text-4xl leading-none sm:text-5xl">
                    Redo att prata
                    <br />
                    <span className="text-heat">om din bil?</span>
                  </h2>
                </div>
                <div>
                  <p className="max-w-xl leading-7 text-cta-panel-foreground/70">
                    Skicka ett mail med registreringsnummer och vad du vill ha hjälp med. Du är
                    också välkommen att ringa eller besöka verkstaden i Kumla.
                  </p>
                  <Button
                    asChild
                    size="lg"
                    className="mt-6 h-12 rounded-full bg-heat px-8 font-semibold shadow-heat hover:-translate-y-0.5"
                  >
                    <Link to="/kontakt">
                      Kontakta oss <ArrowRight />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <ContactCard
                icon={Mail}
                label="Skicka ett mail"
                value={SITE.email}
                href={`mailto:${SITE.email}`}
              />
              <ContactCard
                icon={Phone}
                label="Telefon"
                value={SITE.phoneDisplay}
                href={`tel:${SITE.phone}`}
              />
              <ContactCard
                icon={MapPin}
                label="Besöksadress"
                value={`${SITE.address}, ${SITE.postalCity}`}
                href={SITE.mapUrl}
                external
              />
            </div>
          </div>
        </section>


        <section className="scroll-reveal border-t border-border bg-surface">
          <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="section-kicker">Bakom kulisserna</p>
              <h2 className="mt-3 text-4xl sm:text-5xl">Följ det senaste från verkstaden.</h2>
              <p className="mt-3 text-muted-foreground">
                Projekt, resultat och uppdateringar direkt från Tuning Center Örebro.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-12 bg-heat px-7">
                <a href={SITE.instagram} target="_blank" rel="noreferrer">
                  <Instagram /> Instagram
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 px-7">
                <a href={SITE.facebook} target="_blank" rel="noreferrer">
                  <Facebook /> Facebook
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function ContactCard({
  icon: Icon,
  label,
  value,
  href,
  external = false,
}: {
  icon: typeof Phone;
  label: string;
  value: string;
  href: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="card-premium card-premium-hover group flex min-h-32 items-center gap-4 p-6"
    >
      <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
        <Icon className="size-5" />
      </span>

      <span className="min-w-0">
        <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          {label}
        </span>
        <span className="mt-1 block break-words font-semibold group-hover:text-primary">
          {value}
        </span>
      </span>
    </a>
  );
}
