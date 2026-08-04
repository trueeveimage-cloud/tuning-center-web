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
