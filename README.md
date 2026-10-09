# DoofPlus Frontend

Web Application of DoofPlus, the platform of IngesCompany for pharmaceutical laboratories: quality documents,
deviations and CAPA, batch release with electronic signature, manufacturing against approved master formulas
and IoT monitoring of critical equipment.

Built with Angular 22, Angular Material and ngx-translate (English and Spanish). Each bounded context keeps the
domain, application, infrastructure and presentation layers. Until the DoofPlus Platform (Web Services) is
deployed, the data comes from a fake API served by json-server.

## Run it locally

```bash
npm install
npm run server
```

In a second terminal:

```bash
npm start
```

Open `http://localhost:4200/`. The fake API runs at `http://localhost:3000/api/v1` and stores its data in
`server/db.json`.

## Demo accounts

Every account uses the password `DoofPlus2026!` and the two-factor code `482106`.

| User | Email | Environment |
|------|-------|-------------|
| María México · QA Specialist (release privilege) | `maria.mexico@andinos.com.pe` | QA/QC |
| Alberto Valle · Production Supervisor | `alberto.valle@andinos.com.pe` | Production |
| Carlos Medina · Administrator | `carlos.medina@andinos.com.pe` | Administration |

Signing in to an environment that does not match the role shows the "Access not authorized" state.

## Bounded contexts and routes

| Bounded context | Folder | Main routes |
|-----------------|--------|-------------|
| IAM | `src/app/iam` | `/sign-in`, `/sign-in/:environment`, `/administration/users` |
| Organizations & Profiles | `src/app/organizations` | `/register`, `/administration/overview`, `/<environment>/profile` |
| Subscriptions & Payments | `src/app/subscriptions` | `/administration/subscription` |
| Manufacturing & Batch Management | `src/app/manufacturing` | `/production/overview`, `/production/orders`, `/production/batches`, `/production/products`, `/production/raw-materials` |
| IoT Monitoring | `src/app/monitoring` | `/production/iot`, `/production/equipment`, `/production/sensors/:code`, `/production/incidents` |
| Quality & Compliance | `src/app/quality` | `/qa/overview`, `/qa/documents`, `/qa/deviations`, `/qa/capa`, `/qa/batch-release`, `/qa/audit-trail`, `/qa/tasks` |

`src/app/shared` has the base API, endpoint, assembler and form classes, the public layout, the workspace shell
and the language switcher.

## Build

```bash
npm run build
```

The production build is stored in `dist/`.
