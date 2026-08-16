# Dibs Miami Alpha

Standalone public frontend for the Dibs Miami Alpha. It does not connect to Supabase, Photon, OpenAI, or any database. Phone submissions go directly from the browser to the onboarding endpoint on the existing Dibs backend.

## Setup

```bash
cp .env.example .env.local
# Set NEXT_PUBLIC_DIBS_API_URL to the public existing Dibs backend URL.
npm install
npm run dev
```

The backend must allow browser requests from the deployed website origin (CORS). Do not put secrets in `NEXT_PUBLIC_*` variables.

## Onboarding contract

The form sends:

```http
POST ${NEXT_PUBLIC_DIBS_API_URL}/api/onboarding
Content-Type: application/json

{"phone":"+13055550123","source":"website"}
```

Local numbers are submitted with the US `+1` country code. Explicit international numbers beginning with `+` are preserved. The existing backend remains authoritative for validation, duplicate handling, persistence, onboarding, and message delivery.

## Validation

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

The legal pages contain clearly marked draft placeholders and require legal review before launch.

## Third-party assets

The rendered iPhone frame in `public/mockups` is from
[HTML5 Device Mockups](https://github.com/pixelsign/html5-device-mockups) and
is used under the MIT License included alongside the asset.