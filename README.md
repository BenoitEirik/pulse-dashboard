# Pulse Dashboard

A modular, widget-based aggregation dashboard built with Nuxt. Add, configure, reorder, and remove widgets to create your own personal space for real-time data from various public APIs. It runs entirely in the browser as a client-side SPA, with state persisted to `localStorage`.

## Features

- **Modular widget system** — 7 ready-to-use widgets, easy to extend.
- **Per-widget configuration** — each widget has its own settings (city, crypto, GitHub user, country, etc.).
- **Drag & drop** — reorder widgets freely with SortableJS.
- **Dark & light mode** — seamless theme switching with preference persistence.
- **Local persistence** — dashboard layout and user preferences are saved to `localStorage`.
- **Async loading** — widgets are lazy-loaded with loading states and error handling.
- **Fully client-side** — no backend required, calls public APIs directly from the browser.

## Widgets

| Widget | API | Description |
|--------|-----|-------------|

| **Weather** | Open-Meteo | Current temperature, wind, and weather icon for a selected city. |
| **Crypto** | CoinGecko | 24h price line chart (EUR) for a selected cryptocurrency. |
| **GitHub** | GitHub Users API | Profile card (avatar, bio, repos, followers). |
| **TMDB** | The Movie Database | Trending movies or TV shows with posters and ratings. |
| **NASA APOD** | NASA | Astronomy Picture of the Day (today or random). |
| **Théochrone** | theochrone.fr | Liturgical calendar (Tridentine rite) embedded via iframe. |
| **Flags** | flagcdn.com | Gallery of selected country flags. |

## Tech Stack

- [Nuxt 4](https://nuxt.com/) (Vue 3, TypeScript)
- [Tailwind CSS v4](https://tailwindcss.com/) + CSS variables
- [shadcn-vue](https://www.shadcn-vue.com/)
- [Pinia](https://pinia.vuejs.org/) + `pinia-plugin-persistedstate`
- [Chart.js](https://www.chartjs.org/) + `vue-chartjs`
- [SortableJS](https://sortablejs.github.io/) via `@vueuse/integrations`
- [VueUse](https://vueuse.org/)
- `vue-sonner`, `lucide-vue-next`, `vee-validate`, `zod`
- Package manager: [Bun](https://bun.sh/)

## Setup

### 1. Install dependencies

```bash
# With Bun (recommended)
bun install

# With pnpm
pnpm install

# With npm
npm install
```

### 2. Environment variables

Create a `.env` file at the project root:

```env
NUXT_PUBLIC_COINGECKO_API_KEY=your_coingecko_api_key
NUXT_PUBLIC_TMDB_ACCESS_TOKEN=your_tmdb_access_token
```

> Other APIs (Open-Meteo, GitHub, NASA APOD, Theochrone, FlagCDN) do not require a key or use a demo key by default.

### 3. Start the dev server

```bash
bun run dev
```

The app will be available at `http://localhost:3000`.

## Available Scripts

| Command | Description |
|---------|-------------|

| `bun run dev` | Start the development server |
| `bun run build` | Build for production |
| `bun run generate` | Generate a static version |
| `bun run preview` | Preview the production build locally |
| `bun run postinstall` | Prepare Nuxt (runs automatically after install) |

## Project Structure

```bash
├── app/
│   ├── assets/
│   │   ├── css/tailwind.css
│   │   └── icons/
│   ├── components/
│   │   ├── ui/
│   │   ├── widgets/
│   │   ├── widget-configs/
│   │   ├── WidgetGrid.vue
│   │   ├── WidgetShell.vue
│   │   └── WidgetCatalog.vue
│   ├── composables/
│   ├── data/
│   ├── layouts/
│   ├── pages/
│   ├── plugins/
│   ├── stores/
│   ├── types/
│   └── utils/
├── public/
├── .env
├── nuxt.config.ts
├── package.json
└── tsconfig.json
```

### Adding a new widget

Widgets and their config forms are auto-discovered at build time via `import.meta.glob`. To add one:

1. Create `app/components/widgets/MyWidget.vue`
2. Create `app/components/widget-configs/MyWidgetConfig.vue`
3. Register it in `app/utils/widget-catalog.ts`

## Third-party APIs

| API | Base URL | Usage |
|-----|----------|-------|

| Open-Meteo | `https://api.open-meteo.com` | Weather data |
| Open-Meteo Geocoding | `https://geocoding-api.open-meteo.com` | City search |
| GitHub | `https://api.github.com` | User profiles |
| CoinGecko | `https://api.coingecko.com/api/v3` | Crypto prices |
| TMDB | `https://api.themoviedb.org/3` | Trending movies & TV |
| NASA APOD | `https://api.nasa.gov` | Astronomy picture of the day |
| Theochrone | `https://theochrone.fr` | Liturgical calendar (iframe) |
| FlagCDN | `https://flagcdn.com` | Country flag images |

## Deployment

As a pure frontend SPA, this project can be deployed to any static hosting provider (Vercel, Netlify, Cloudflare Pages, etc.).

See the [Nuxt deployment docs](https://nuxt.com/docs/getting-started/deployment) for more details.

## License

[MIT](LICENSE)
