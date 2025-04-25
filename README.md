# El Búnquer Podcast

Aquest projecte és un lloc web per al podcast "El Búnquer". Està construït utilitzant Astro, un framework modern per construir llocs web ràpids i optimitzats.

## 🚀 Estructura del Projecte

Dins d'aquest projecte, trobaràs la següent estructura de carpetes i fitxers:

```text
/
├── public/
│   ├── bunquer-logo.svg
│   ├── search.svg
│   └── images/
│       ├── dots-dark.svg
│       ├── dots-light.svg
│       ├── forward-icon.svg
│       ├── mute-icon.svg
│       ├── overcast.svg
│       ├── rewind-icon.svg
│       ├── rocket-dark.svg
│       ├── rocket-light.svg
│       ├── spotify.svg
│       ├── unmute-icon.svg
│       ├── www.png
│       └── youtube.svg
├── src/
│   ├── components/
│   │   ├── Breadcrumbs.astro
│   │   ├── Dots.astro
│   │   ├── EpisodeList.tsx
│   │   ├── FormattedDate.tsx
│   │   ├── FullPlayButton.tsx
│   │   ├── Player.tsx
│   │   ├── ShowArtwork.astro
│   │   └── player/
│   │       ├── PlaybackRateButton.tsx
│   │       ├── PlayButton.tsx
│   │       ├── ForwardButton/
│   │       │   ├── index.tsx
│   │       │   ├── styles.css
│   │       │   └── images/
│   │       │       └── forward-icon.svg
│   │       ├── MuteButton/
│   │       │   ├── index.tsx
│   │       │   ├── styles.css
│   │       │   └── images/
│   │       │       ├── mute-icon.svg
│   │       │       └── unmute-icon.svg
│   │       ├── RewindButton/
│   │       │   ├── index.tsx
│   │       │   ├── styles.css
│   │       │   └── images/
│   │       │       └── rewind-icon.svg
│   │       └── Slider/
│   │           ├── index.tsx
│   │           └── styles.css
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   ├── [episode].astro
│   │   ├── index.astro
│   │   └── api/
│   │       └── season/
│   │           └── [season]/
│   │               └── episodes/
│   │                   └── [page].json.ts
│   ├── styles/
│   │   ├── buttons.css
│   │   ├── global.css
│   │   ├── gradient-icon.css
│   │   └── tailwind.css
│   └── utils/
│       └── adapter.ts
├── astro.config.mjs
├── package.json
├── tailwind.config.mjs
└── tsconfig.json
```

Astro busca fitxers `.astro` o `.md` al directori `src/pages/`. Cada fitxer s'exposa com una ruta basada en el seu nom.

Els components es troben a `src/components/`, i els estils globals i específics estan a `src/styles/`.

Qualsevol recurs estàtic, com imatges, es pot col·locar al directori `public/`.

## 🧞 Comandes

Totes les comandes s'executen des de l'arrel del projecte, en una terminal:

| Comanda                  | Acció                                            |
| :----------------------- | :------------------------------------------------ |
| `npm install`            | Instal·la les dependències                       |
| `npm run dev`            | Inicia el servidor de desenvolupament a `localhost:4321` |
| `npm run build`          | Construeix el lloc per a producció a `./dist/`   |
| `npm run preview`        | Previsualitza el teu lloc construït localment    |
| `npm run astro ...`      | Executa comandes CLI com `astro add`, `astro check` |
| `npm run astro -- --help`| Obté ajuda sobre el CLI d'Astro                  |

## 👀 Més Informació

Tot el contingut exposat en el lloc web s'ha extret de https://api.3cat.cat/audios?ordre=data_publicacio&programaradio_id=1909
