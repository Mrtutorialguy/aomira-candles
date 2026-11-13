# Aomira Candles

A handcrafted botanical candle studio storefront and backend built with Next.js App Router, Tailwind CSS, TypeScript, and Zod.

## Features

- **Artisanal Storefront**: Warm, editorial aesthetic designed for small-batch candle ateliers.
- **Scent Architecture**: Visual olfactory notes breakdown (Top, Heart, Base) with burn times and wax composition.
- **Interactive Basket & Checkout**: Client-side cart state with free shipping meter ($70 threshold) and live order submission.
- **Backend API Routes**:
  - `GET /api/products`: Full candle catalog with filter parameters for featured items and wax types.
  - `GET /api/products/[id]`: Product retrieval by ID or slug.
  - `POST /api/orders`: Schema-validated checkout endpoint calculating subtotals, shipping, and returning order confirmation codes.
  - `POST /api/contact`: Custom scent inquiries and wholesale requests.
  - `GET /api/contact`: Inquiry status and count.
- **Form Validation**: Strict schema enforcement using Zod.
- **Design Tokens**: Bespoke color palette (warm beeswax, amber, terracotta, cedarwood, charcoal).

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the local development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Production Build

```bash
npm run build
npm run start
```
