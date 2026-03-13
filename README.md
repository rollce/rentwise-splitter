# RentWise Splitter

RentWise Splitter is a multi-page household finance app for roommates. It records shared expenses and computes who should pay whom to settle monthly balances.

Live: https://rent.rollsev.work

## Why this project exists

Shared apartment expenses are a common source of conflict. This project demonstrates a practical product approach: transparent input, deterministic split logic, and explicit settlement actions.

## Product goals

- Capture household bills with split participants
- Compute fair balances per resident
- Generate minimal settlement transfers
- Provide clear operating rules to reduce repeated conflicts

## Pages and user flows

- `/` Overview
  - Product summary and outcomes
- `/bills`
  - Add and review bills
- `/settlements`
  - View generated transfer plan and net balances
- `/rules`
  - Household agreement and prevention checklist

## API surface

### `GET /api/bills`
Returns all stored bills.

### `POST /api/bills`
Creates a new bill.

Required:
- `title`
- `amount` (number > 0)
- `paidBy` (one of `Alex`, `Sam`, `Mira`, `Noah`)
- `splitWith` (array with at least one valid resident)

Optional:
- `category` (`Rent`, `Utilities`, `Groceries`, `Internet`, `Other`)

### `GET /api/settlements`
Returns:
- `settlements`: transfer list (`from`, `to`, `amount`)
- `balance`: net resident balances

## Settlement algorithm

Implemented in `src/lib/store.ts`:
- Compute each resident net balance from all bills
- Split residents into debtors and creditors
- Iteratively settle with minimum transfer amount per pair
- Continue until all balances are near zero

This provides a clear, deterministic settlement output suitable for monthly reconciliation.

## Data model (demo)

Bill fields:
- `id`, `title`, `amount`, `paidBy`, `splitWith`, `category`, `createdAt`

Resident set:
- `Alex`, `Sam`, `Mira`, `Noah`

Note: current storage is in-memory for demo/portfolio mode.

## UI / UX stack

- Ant Design (`Table`, `Card`, `Form`, `Statistic`, `Timeline`, `Tag`)
- Framer Motion animations
- Tailwind CSS 4 styling

## Technical stack

- Next.js 16 (App Router + Route Handlers)
- TypeScript
- Tailwind CSS 4
- Ant Design
- Framer Motion

## Run locally

```bash
npm install
npm run dev
```

Open: http://localhost:3000

## Quality checks

```bash
npm run lint
npm run build
```

## Deployment

- Deployed on Railway
- Public domain: `rent.rollsev.work`

## Portfolio value

RentWise demonstrates domain modeling, API validation, and algorithmic settlement logic for real household operations.

## Roadmap

- Add recurring bills and month snapshots
- Add resident authentication and invite flow
- Add payment proof attachments and export reports
