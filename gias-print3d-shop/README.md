# Gia's Print3D Shop

A fully responsive e-commerce web application built with React, showcasing a fictional 3D-printed product store.

**Live site:** [stoicaglasul-tech.github.io/my-react-project](https://stoicaglasul-tech.github.io/my-react-project/)

---

## Features

- **Shop** — 30 products across 7 categories (Home Decor, Toys & Games, Tools & Gadgets, Art & Sculptures, Jewelry, Home & Storage, Collectibles)
- **Search & Filter** — filter by category, sort by price or rating, live search
- **Product Detail** — images, star ratings, quantity selector, add to cart / wishlist
- **Shopping Cart** — adjust quantities, remove items, free shipping above $50
- **Multi-step Checkout** — shipping form → payment form → order review → payment simulation (90% approve / 10% decline)
- **User Accounts** — sign up, sign in, session persisted via localStorage
- **Wishlist** — save products, move to cart, badge counter on navbar
- **Order History** — confirmed orders saved to localStorage

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Markup | HTML5 |
| Styling | CSS3 (custom properties, Flexbox, Grid, animations) |
| Language | JavaScript ES6+ |
| UI Library | React 18 |
| Routing | React Router DOM v6 |
| Icons | React Icons v5 |
| Build Tool | Vite 6 |
| Hosting | GitHub Pages via GitHub Actions |

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Demo Credentials

| Field | Value |
|-------|-------|
| Email | gia@print3d.com |
| Password | demo1234 |

Use the **Autofill demo** button on the checkout form to populate shipping and payment fields with sample data.

## Project Structure

```
src/
├── components/     # Navbar, Footer, ProductCard
├── pages/          # Home, Shop, ProductDetail, Cart, Checkout, …
├── context/        # AppContext — global state (cart, wishlist, user)
├── data/           # products.js — 30 products with Unsplash images
└── index.css       # CSS custom properties, dark theme
```

## Deployment

The app is deployed automatically on every push to `main` via a GitHub Actions workflow:

1. Install dependencies (`npm ci`)
2. Build (`vite build`)
3. Deploy `dist/` to GitHub Pages

`HashRouter` is used instead of `BrowserRouter` for compatibility with static hosting (no server-side URL rewriting).

---

*Front-End Development project — Gia Stoica, 2025/2026*
