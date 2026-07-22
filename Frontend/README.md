# ALIVE — frontend

Angular 18 standalone app: login/register + a dashboard with the big "I'm alive" button.

## Setup

```bash
npm install
npm start -- --proxy-config proxy.conf.json
```

This assumes your Express backend runs on `http://localhost:3000` and exposes:

```
POST /api/auth/login       { email, password }        -> { token, user }
POST /api/auth/register    { email, password, displayName } -> { token, user }
GET  /api/groups                                       -> [{ id, name, memberCount }]
POST /api/checkin          {}                          -> { checkedInAt }
```

## What's built

- `core/services` — `AuthService` (JWT stored in localStorage, exposes a `currentUser` signal),
  `CheckinService`, `GroupService`
- `core/guards/auth.guard.ts` — redirects to `/login` if not authenticated
- `core/interceptors/auth.interceptor.ts` — attaches `Authorization: Bearer <token>` to every request
- `features/auth/login`, `features/auth/register` — reactive forms, shared visual styling in `auth-shell.css`
- `features/dashboard` — the big button (idle "breathing" animation, tap confirmation state) + a
  read-only list of the user's groups

## Not built yet (next steps, backend-dependent)

- Group creation / join-by-invite-code screens
- Per-group member status list (who's checked in, who hasn't)
- The Express API itself and the PostgreSQL schema
