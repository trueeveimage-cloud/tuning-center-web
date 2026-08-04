export function renderErrorPage(): string {
  return `<!doctype html>
<html lang="sv">
  <head>
    <meta charset="utf-8" />
    <title>Sidan kunde inte laddas</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body { font: 15px/1.5 system-ui, sans-serif; background: #171512; color: #f5f1e9; display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 1.5rem; }
      .card { max-width: 28rem; width: 100%; text-align: center; padding: 2rem; }
      h1 { font-size: 1.5rem; margin: 0 0 0.5rem; text-transform: uppercase; }
      p { color: #aaa39a; margin: 0 0 1.5rem; }
      .actions { display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap; }
      a, button { padding: 0.6rem 1rem; border-radius: 0.25rem; font: inherit; cursor: pointer; text-decoration: none; border: 1px solid transparent; }
      .primary { background: #e06a23; color: #171512; }
      .secondary { background: transparent; color: #f5f1e9; border-color: #4b4640; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>Sidan kunde inte laddas</h1>
      <p>Något gick fel. Försök igen eller gå tillbaka till startsidan.</p>
      <div class="actions">
        <button class="primary" onclick="location.reload()">Försök igen</button>
        <a class="secondary" href="/">Till startsidan</a>
      </div>
    </div>
  </body>
</html>`;
}
