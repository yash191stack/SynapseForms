# SynapseForms — Frontend Foundation

Frontend workspace for **SynapseForms** (Dynamic Form Builder & Verification Platform), established by **Shresht Soni** for pair collaboration with **Gauri Upadhyay** (UI Design System) and **Yash Sharma** (Backend Foundation).

---

## 1. Tech Stack

- **Framework**: React 19 + Vite 8
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`)
- **Routing**: React Router DOM v7
- **Icons**: Lucide React
- **Typography**: Plus Jakarta Sans & JetBrains Mono

---

## 2. Quickstart & Independent Execution

The client is configured to run completely independently of the backend during development:

```bash
cd client
npm install
npm run dev
```

The application will be served at `http://localhost:5173/`.

To create a production bundle:

```bash
npm run build
npm run preview
```

---

## 3. Implemented Routes & Pages

| Route | Page Component | Layout | Assigned To | Status |
|---|---|---|---|---|
| `/` | `LandingPage.jsx` | `PublicLayout` | Shresht Soni | **Complete** |
| `/admin/login` | `LoginPage.jsx` | Standalone | Shresht Soni | **Complete** |
| `/admin/dashboard` | `DashboardPage.jsx` | `AdminLayout` | Shresht Soni | **Complete** |
| `/admin/forms` | `FormsPage.jsx` | `AdminLayout` | Shresht Soni | **Complete** |
| `/admin/forms/create` | `FormBuilderPage.jsx` | `AdminLayout` | Shresht Soni | **Complete** |
| `/admin/ledger` | `PlaceholderPage.jsx` | `AdminLayout` | Gauri Upadhyay | Hand-off Ready |
| `/admin/submissions` | `PlaceholderPage.jsx` | `AdminLayout` | Gauri Upadhyay | Hand-off Ready |
| `/admin/submissions/:id` | `PlaceholderPage.jsx` | `AdminLayout` | Gauri Upadhyay | Hand-off Ready |
| `/forms/:formId` | `PlaceholderPage.jsx` | `PublicLayout` | Gauri Upadhyay | Hand-off Ready |

---

## 4. Shared Common Component Conventions (For Gauri Upadhyay)

All common components live in `src/components/common/`:

### `Button`
- `variant`: `'primary' | 'secondary' | 'outline' | 'danger' | 'ghost' | 'success'`
- `size`: `'sm' | 'md' | 'lg'`
- `loading`: `boolean` (displays spinner)
- `icon`: React node (e.g. `<PlusCircle className="w-4 h-4" />`)
- `iconPosition`: `'left' | 'right'`
- `disabled`: `boolean`
- `fullWidth`: `boolean`

### `Input`
- `label`: `string`
- `error`: `string` (renders error state + helper text)
- `helperText`: `string`
- `icon`: React node (left-aligned icon)
- `required`: `boolean`
- `disabled`: `boolean`

### `Card`
- `title`: `ReactNode`
- `subtitle`: `ReactNode`
- `action`: `ReactNode` (top right action button/badge)
- `footer`: `ReactNode` (card footer wrapper)
- `hover`: `boolean` (adds interactive hover shadow)

### `Badge`
- `variant`: `'default' | 'success' | 'warning' | 'danger' | 'info' | 'purple' | 'neutral'`
- Automatic verification mapping: strings `'VERIFIED'`, `'FLAGGED'`, `'INVALID'`, `'PENDING'` automatically map to their respective status colors.
- `dot`: `boolean` (displays indicator circle)
- `size`: `'sm' | 'md'`

---

## 5. Folder Architecture

```text
client/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Badge.jsx
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   └── Input.jsx
│   │   └── layout/
│   │       ├── Footer.jsx
│   │       ├── Header.jsx
│   │       └── Sidebar.jsx
│   ├── layouts/
│   │   ├── AdminLayout.jsx
│   │   └── PublicLayout.jsx
│   ├── pages/
│   │   ├── admin/
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── FormBuilderPage.jsx
│   │   │   ├── FormsPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   └── PlaceholderPage.jsx
│   │   └── public/
│   │       └── LandingPage.jsx
│   ├── routes/
│   │   └── AppRoutes.jsx
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```
