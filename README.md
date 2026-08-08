# Tuning Center Web

make a website for

📞 0790790007
📩 Tuningcenter59@gmail.com
📷 Instagram: @tuningcenterorebro
🔵 Facebook: Tuning Center Örebro

och vi kan bygga en betydligt mer modern, snabbare och professionell hemsida än den ni skickade som exempel.

behöver inte vara så avancerad sida, det ska finnas api (tuningkalkylator) som den sidan , kontakta oss, kopplat till insta och facebook, recensioner osv 

Tuning Center Örebro

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/76b241b6-8f59-42c7-8637-bdd59f89928a).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Registration lookup

The tuning calculator identifies Swedish vehicles through Transportstyrelsen's public technical
vehicle lookup. A Biluppgifter API key can optionally be used as the primary provider by adding
`BILUPPGIFTER_API_KEY` as a server-side secret in the deployment environment. For local
development, copy `.dev.vars.example` to `.dev.vars` and add the real key. Never expose the key
through a `VITE_` environment variable.

## DR-File effect configurator

The calculator can use the licensed DR-File vehicle configurator for provider-verified tuning
figures. Add Tuning Center's own license as `VITE_DR_FILE_LICENSE` in the build environment, or
copy `.env.example` to `.env` locally. This license is necessarily public because DR-File embeds it
in the iframe URL. Without it, the registration-based calculator remains available as a fallback.
Do not reuse another workshop's DR-File license.

## ECU and vehicle capabilities

The registration calculator can optionally enrich a vehicle result with provider-verified ECU and
capability data. Configure `VEHICLE_CAPABILITY_API_URL` and, when required, the server-only
`VEHICLE_CAPABILITY_API_KEY`. The endpoint receives the normalized registration in the
`registration` query parameter and may return `ecu` plus `features`, `functions`, `capabilities`,
or `available_functions` data. The server normalizes those values into verified, available,
not-applicable, or manual-review statuses.

If the provider is not configured or does not return a value, the UI shows `Kräver kontroll` and
does not infer an ECU or emissions capability from the vehicle model. Provider keys must never be
placed in a `VITE_` variable.

## ByteFLASH Stage 1 widget

The public effect calculator uses the free ByteFLASH iframe widget as its primary Stage 1 data
source. The existing Swedish registration lookup remains available as a separate mode for vehicle
and engine identification. Because the free widget is hosted on another origin, browser security
prevents the registration result from preselecting a ByteFLASH vehicle. Direct preselection or
copying provider figures into the local catalog requires licensed ByteFLASH API access.
