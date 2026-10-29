# SynapseForms

### Intelligent Dynamic Forms & Verification Platform

SynapseForms is a dynamic form-building and submission verification platform that helps organizations collect, validate, and manage structured information efficiently.

It combines customizable forms, rule-based validation, master data matching, and OCR-powered document analysis to improve the accuracy and reliability of digital submissions.

## 🚀 Getting Started

### First-time setup (sirf ek baar)

```bash
# 1. Project root pe jao
cd SynapseForms

# 2. Saari dependencies install karo (root + server + client)
npm run setup
```

### Roz project start karna (ek hi command)

```bash
# Project root (SynapseForms/) se chalao
npm run dev
```

> Yeh ek saath **Server** (nodemon) aur **Client** (Vite) dono start kar dega.

| Service | URL |
|---------|-----|
| 🖥️ Client (React) | http://localhost:5173 |
| ⚙️ Server (Express) | http://localhost:5000 |

### Alag alag start karna ho to

```bash
# Terminal 1 — Server
cd server
npm run dev

# Terminal 2 — Client
cd client
npm run dev
```

---

## Features

- **Dynamic Form Builder:** Create custom forms with configurable fields, validation rules, and required inputs.
- **Master Data Integration:** Import CSV or Excel datasets to validate submitted information against existing records.
- **Real-Time Validation:** Validate user inputs using predefined rules and master data.
- **Document Processing:** Upload receipts and supporting documents for OCR-based text extraction.
- **Verification Engine:** Evaluate submissions using multiple validation checks.
- **Submission Management:** Track and manage submissions through different verification states.
- **Manual Review:** Identify uncertain or inconsistent submissions for administrative review.
- **Dashboard & Analytics:** View submission statistics and verification summaries.
- **Data Export:** Export submission records for reporting and further analysis.

## System Architecture

SynapseForms follows a modular client-server architecture.

```text
                 ┌──────────────────────┐
                 │      Frontend        │
                 │   React + Vite       │
                 └──────────┬───────────┘
                            │
                       HTTP / REST API
                            │
                 ┌──────────▼───────────┐
                 │      Backend         │
                 │   Node.js + Express  │
                 └──────────┬───────────┘
                            │
             ┌──────────────┼──────────────┐
             │              │              │
      ┌──────▼─────┐ ┌──────▼──────┐ ┌─────▼────────┐
      │ Validation │ │ OCR Service │ │ Verification │
      │   Engine   │ │ Tesseract.js│ │    Engine    │
      └────────────┘ └─────────────┘ └──────────────┘
                            │
                 ┌──────────▼───────────┐
                 │       MongoDB        │
                 │ Forms, Records,      │
                 │ Submissions, Users   │
                 └──────────────────────┘
```

## How It Works

1. An administrator creates a dynamic form.
2. Reference data is imported through a CSV or Excel file.
3. Users access and submit the published form.
4. Input fields are validated against configured rules and reference records.
5. Supporting documents are uploaded when required.
6. OCR extracts relevant information from uploaded documents.
7. The verification engine evaluates the available validation results.
8. Each submission receives an appropriate verification status.
9. Administrators can review flagged submissions and manage the results.

## Verification States

| Status | Description |
|---|---|
| `VERIFIED` | Required validation checks have passed. |
| `FLAGGED` | Inconsistencies or uncertain results require review. |
| `INVALID` | One or more critical validation checks have failed. |
| `PENDING` | Verification is still in progress. |

## Technology Stack

| Layer | Technologies |
|---|---|
| Frontend | React.js, Vite |
| Styling | Tailwind CSS |
| Icons | Lucide React |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Authentication | JWT, bcrypt |
| File Uploads | Multer |
| OCR | Tesseract.js |
| API Communication | REST API |

## Project Structure

```text
SynapseForms/
│
├── client/                  # React frontend
│   └── src/
│       ├── components/      # Reusable UI components
│       ├── layouts/         # Application layouts
│       ├── pages/           # Application pages
│       ├── services/        # API communication
│       ├── hooks/           # Custom React hooks
│       └── data/            # Mock and static data
│
├── server/                  # Node.js backend
│   ├── config/              # Database configuration
│   ├── models/              # MongoDB models
│   ├── controllers/         # Request handlers
│   ├── routes/              # API routes
│   ├── middleware/          # Authentication and uploads
│   ├── services/            # Core business logic
│   └── utils/               # Helper functions
│
├── README.md
└── .gitignore
```

## Core Modules

- **Authentication Module:** Secure administrator authentication and access control.
- **Form Management Module:** Form creation, configuration, publishing, and management.
- **Master Ledger Module:** Dataset import, storage, and record matching.
- **Validation Module:** Field-level and database-based validation.
- **OCR Module:** Document text extraction and processing.
- **Verification Module:** Consolidated evaluation of validation results.
- **Submission Module:** Submission storage, tracking, review, and export.

## Future Enhancements

- Payment gateway and trusted transaction verification integration.
- Advanced anomaly and duplicate detection.
- Cloud-based document storage.
- Background processing for large datasets.
- Advanced analytics and reporting.

## Important Considerations

OCR extracts text from documents but does not independently prove their authenticity. Verification decisions should rely on trusted reference data, configured validation rules, and authoritative external sources wherever available.

---

**SynapseForms — Smarter Forms. Reliable Submissions.**