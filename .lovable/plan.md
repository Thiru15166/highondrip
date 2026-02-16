

## Admin Dashboard Page

Create `src/pages/Admin.tsx` -- a secure admin gateway that verifies Firebase Auth + Firestore role before granting access.

### How It Works

1. On mount, check if `auth.currentUser` exists
2. If logged in, fetch `doc("users", uid)` from Firestore
3. If document exists and `role === "admin"`, show dashboard
4. Otherwise, redirect to `/`
5. While checking, show a loading state: "Checking admin access..."

### UI

- Centered layout matching the brand aesthetic (off-white background, clean typography)
- Title: "Admin Dashboard"
- Two full-width black buttons: "Manage Products" and "View Orders"
- Minimal, no clutter

### Route

- Add `/admin` route in `App.tsx`

### Technical Details

- Uses `onAuthStateChanged` to reliably detect auth state (not just `currentUser` which can be null on refresh)
- Imports `doc`, `getDoc` from `firebase/firestore` and `db`, `auth` from `@/firebase`
- Three states: `loading`, `isAdmin`, triggers `navigate("/")` if unauthorized
- No new dependencies required

### Files Changed

| File | Action |
|------|--------|
| `src/pages/Admin.tsx` | Create |
| `src/App.tsx` | Add `/admin` route |

