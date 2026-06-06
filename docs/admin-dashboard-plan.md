# Admin License Dashboard — Plan

## Overview

A web-based admin dashboard for managing 0xbuffer lifetime licenses. The admin (you) can generate license keys, view all issued licenses, track activations, and revoke keys. This dashboard talks to the same license server API that the desktop app uses for verification.

## Users

- **Admin only** — protected by the existing server Bearer token (same key used for collaborator API auth).

## Tech Stack

- **Framework**: Next.js (can live inside `web-apprecon` or a separate `/admin` route group)
- **Auth**: Bearer token stored in environment variable, sent with every API request
- **UI**: shadcn/ui components, Tailwind CSS (matching existing web-apprecon design)
- **API**: Existing collaborator server license endpoints (`/api/v1/admin/licenses/*`)

## Server API Endpoints (Already Built)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/v1/admin/licenses` | Generate a new license key |
| `GET` | `/api/v1/admin/licenses` | List all licenses with activation counts |
| `DELETE` | `/api/v1/admin/licenses/:key` | Revoke a license key |

### Request/Response Reference

**Create License**
```json
POST /api/v1/admin/licenses
Authorization: Bearer <ADMIN_API_KEY>

{
  "email": "customer@example.com",   // optional
  "plan": "lifetime",                // optional, defaults to "lifetime"
  "maxDevices": 3                    // optional, defaults to 3
}

→ 200 OK
{
  "id": "uuid",
  "key": "0XB-K3H9F-M7P2Q-W4X8J-N6B5A",
  "plan": "lifetime",
  "email": "customer@example.com",
  "maxDevices": 3
}
```

**List Licenses**
```json
GET /api/v1/admin/licenses
Authorization: Bearer <ADMIN_API_KEY>

→ 200 OK
[
  {
    "id": "uuid",
    "key": "0XB-K3H9F-M7P2Q-W4X8J-N6B5A",
    "email": "customer@example.com",
    "plan": "lifetime",
    "maxDevices": 3,
    "status": "active",
    "activationCount": 1,
    "createdAt": "2026-06-06T12:00:00Z"
  }
]
```

**Revoke License**
```json
DELETE /api/v1/admin/licenses/0XB-K3H9F-M7P2Q-W4X8J-N6B5A
Authorization: Bearer <ADMIN_API_KEY>

→ 200 OK
{ "revoked": true, "message": "License revoked" }
```

---

## Pages

### 1. Dashboard Overview (`/admin`)

Summary cards at the top:

| Card | Data |
|------|------|
| Total Licenses | Count of all licenses |
| Active Licenses | Count where status = `active` |
| Revoked Licenses | Count where status = `revoked` |
| Total Activations | Sum of all `activationCount` values |

Below the cards: a recent licenses table (last 10 created).

### 2. All Licenses (`/admin/licenses`)

Full table with:

| Column | Description |
|--------|-------------|
| Key | `0XB-XXXXX-...` with copy button |
| Email | Customer email (if provided) |
| Plan | `lifetime` badge |
| Status | `active` (green) / `revoked` (red) |
| Devices | `activationCount / maxDevices` |
| Created | Formatted date |
| Actions | Revoke button, copy key button |

**Features:**
- Search by key or email
- Filter by status (all / active / revoked)
- Sort by created date (newest first)
- Pagination or infinite scroll
- Bulk actions (optional, future)

### 3. Generate License (`/admin/licenses/new`)

A form to create a new license:

| Field | Type | Default |
|-------|------|---------|
| Email | text input | empty (optional) |
| Plan | select | `lifetime` |
| Max Devices | number input | `3` |

**On submit:**
1. `POST /api/v1/admin/licenses` with form data
2. Show success state with the generated key prominently displayed
3. One-click copy key button
4. "Share via email" button (copies a pre-formatted message with the key)

**Success state UI:**
```
✓ License Generated

Key:    0XB-K3H9F-M7P2Q-W4X8J-N6B5A    [Copy]
Email:  customer@example.com
Plan:   Lifetime
Devices: 3

[Share via Email]  [Generate Another]  [View All Licenses]
```

### 4. License Detail (`/admin/licenses/:key`)

Clicking a license row opens a detail view:

| Section | Content |
|---------|---------|
| License Info | Key (copy), email, plan, status, created date |
| Activation Stats | `activationCount / maxDevices` with progress bar |
| Actions | Revoke / Reactivate (future) |

---

## File Structure

```
web-apprecon/
  app/
    admin/
      page.tsx                    ← Dashboard overview
      layout.tsx                  ← Admin layout (auth guard, sidebar nav)
      licenses/
        page.tsx                  ← All licenses table
        new/
          page.tsx                ← Generate license form
        [key]/
          page.tsx                ← License detail
      components/
        admin-sidebar.tsx         ← Sidebar navigation
        license-table.tsx         ← Reusable license data table
        stat-cards.tsx            ← Dashboard summary cards
        generate-form.tsx         ← License generation form
        license-detail.tsx        ← License detail panel
      lib/
        api.ts                    ← Server API client (fetch wrapper)
        types.ts                  ← TypeScript interfaces
        auth.ts                   ← Auth middleware / token validation
```

## Auth Flow

1. Admin visits `/admin` → redirected to `/admin/login` if no session
2. Login page asks for the admin API key (same Bearer token used for server API)
3. Key is stored in a server-side cookie or session (never exposed to client)
4. Every API call includes `Authorization: Bearer <key>` header
5. Logout clears the session

**Alternative (simpler):** Use Next.js middleware with a single password gate. The admin API key is stored as an env var and validated server-side only.

## Environment Variables

```env
LICENSE_SERVER_URL=https://license.0xbuffer.com
ADMIN_API_KEY=<your-server-api-key>
```

## Implementation Tasks

| # | Task | Priority |
|---|------|----------|
| 1 | Create `/admin` route group with layout and auth guard | P0 |
| 2 | Build API client (`lib/api.ts`) with all 3 endpoints | P0 |
| 3 | Generate License page with form + success state | P0 |
| 4 | All Licenses table with search, filter, copy key | P0 |
| 5 | Dashboard overview with stat cards | P1 |
| 6 | License detail page | P1 |
| 7 | Revoke action with confirmation dialog | P1 |
| 8 | "Share via email" copy template | P2 |
| 9 | Export licenses as CSV | P2 |
| 10 | Activity log (who generated/revoked what) | P3 |
