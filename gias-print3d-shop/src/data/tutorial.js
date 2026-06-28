export const steps = [
  {
    id: 1,
    title: 'Project Setup',
    subtitle: 'Creating a React app with Vite',
    emoji: '🚀',
    theory: `Before writing any React code, you need a project. We use **Vite** — a modern build tool that starts much faster than the old Create React App.

Vite gives you a dev server with instant hot-reload (changes appear in the browser the moment you save), and bundles your code for production.`,
    steps: [
      'Open a terminal in the folder where you want your project.',
      'Run the command below to create a new React project.',
      'Enter the project folder and install dependencies.',
      'Start the dev server — your app opens at http://localhost:5173.',
    ],
    code: `# 1. Create the project
npm create vite@latest print3d-shop -- --template react

# 2. Enter the folder
cd print3d-shop

# 3. Install dependencies
npm install

# 4. Start the dev server
npm run dev`,
    lang: 'bash',
    tip: 'Vite uses ES Modules natively, so startup is nearly instant — no bundling needed during development.',
    result: 'You now have a running React app at http://localhost:5173 with a sample counter component.',
  },
  {
    id: 2,
    title: 'Project Structure',
    subtitle: 'How files are organised',
    emoji: '🗂️',
    theory: `A well-organised project is much easier to build and maintain. Here is the folder structure used in Print3D Shop and **why** each folder exists.

Understanding this layout means you always know where to look when something needs changing.`,
    steps: [
      'src/ holds all your React source code.',
      'src/components/ contains reusable UI pieces (Navbar, ProductCard).',
      'src/pages/ contains full-page components (Home, Shop, Cart).',
      'src/context/ holds global state (cart, wishlist, user).',
      'src/data/ stores static data (products list, tutorial content).',
    ],
    code: `print3d-shop/
├── index.html          ← Entry HTML, mounts React
├── vite.config.js      ← Vite settings
├── package.json        ← Dependencies & scripts
└── src/
    ├── main.jsx        ← Renders <App /> into #root
    ├── App.jsx         ← Routes (which page shows where)
    ├── index.css       ← Global styles & CSS variables
    ├── components/
    │   ├── Navbar.jsx
    │   ├── Navbar.css
    │   ├── ProductCard.jsx
    │   ├── ProductCard.css
    │   └── Footer.jsx
    ├── pages/
    │   ├── Home.jsx
    │   ├── Shop.jsx
    │   ├── ProductDetail.jsx
    │   ├── Cart.jsx
    │   ├── Wishlist.jsx
    │   ├── Checkout.jsx
    │   ├── SignIn.jsx
    │   └── SignUp.jsx
    ├── context/
    │   └── AppContext.jsx
    └── data/
        └── products.js`,
    lang: 'bash',
    tip: 'Keep components small and single-purpose. If a component file grows past ~150 lines, consider splitting it.',
    result: 'A clear mental map of the project — you know exactly where every piece of code lives.',
  },
  {
    id: 3,
    title: 'JSX — HTML inside JavaScript',
    subtitle: 'React\'s special syntax',
    emoji: '✍️',
    theory: `JSX lets you write HTML-like code directly inside JavaScript. React transforms it into regular JavaScript calls behind the scenes.

Key rules:
- Every component must return **one root element** (wrap multiple elements in a \`<div>\` or \`<>\`)
- Use **className** instead of \`class\` (class is a reserved JS keyword)
- JavaScript expressions go inside **{ curly braces }**
- Self-closing tags need a slash: \`<img />\` not \`<img>\``,
    steps: [
      'Write a function that returns JSX.',
      'Use className (not class) for CSS.',
      'Embed JS values inside { }.',
      'Export the component so other files can import it.',
    ],
    code: `// src/components/ProductCard.jsx

export default function ProductCard({ product }) {
  // JavaScript variable
  const isExpensive = product.price > 50;

  // JSX returned from the function
  return (
    <div className="product-card">
      {/* Comment syntax in JSX */}
      <img src={product.image} alt={product.name} />

      <div className="card-body">
        {/* Embed any JS expression */}
        <h3>{product.name}</h3>
        <p>{product.category.toUpperCase()}</p>

        {/* Conditional rendering */}
        {isExpensive && <span className="badge">Premium</span>}

        <p>\${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
}`,
    lang: 'jsx',
    tip: 'JSX is just syntax sugar. <div className="x"> compiles to React.createElement("div", { className: "x" }).',
    result: 'A reusable ProductCard component that accepts data and renders it as HTML.',
  },
  {
    id: 4,
    title: 'Props — Passing Data Down',
    subtitle: 'How components communicate',
    emoji: '📦',
    theory: `**Props** (short for properties) are how you pass data from a parent component to a child component — like function arguments.

Props flow **one way**: parent → child. A child can never directly modify the props it receives. This makes data flow predictable and easy to debug.`,
    steps: [
      'Define what data the child needs (destructure from props).',
      'Pass data from the parent like HTML attributes.',
      'The child receives them and renders accordingly.',
      'Props can be strings, numbers, arrays, objects, or even functions.',
    ],
    code: `// ── Parent: Shop.jsx ────────────────────────────────
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

export default function Shop() {
  return (
    <div className="products-grid">
      {products.map(product => (
        // Pass the whole product object as a prop
        <ProductCard
          key={product.id}       // Required for lists!
          product={product}      // The prop
        />
      ))}
    </div>
  );
}

// ── Child: ProductCard.jsx ───────────────────────────
export default function ProductCard({ product }) {
  //  ↑ Destructure "product" from props

  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>\${product.price}</p>
    </div>
  );
}`,
    lang: 'jsx',
    tip: 'Always add a unique key prop when rendering lists (.map()). React uses it to efficiently update only changed items.',
    result: 'Products data flows from the Shop page down into individual ProductCard components.',
  },
  {
    id: 5,
    title: 'useState — Local State',
    subtitle: 'Making components interactive',
    emoji: '🔁',
    theory: `**State** is data that can change over time, and when it changes React re-renders the component automatically.

\`useState\` is a Hook — a special React function that adds state to a functional component. It returns two things: the current value, and a function to update it.

Use state for anything the user can interact with: search input, quantity picker, open/closed toggles.`,
    steps: [
      'Import useState from React.',
      'Call useState(initialValue) — it returns [value, setter].',
      'Call the setter to update; React re-renders automatically.',
      'Never mutate state directly — always use the setter.',
    ],
    code: `import { useState } from 'react';

export default function ProductDetail({ product }) {
  // qty starts at 1
  const [qty, setQty] = useState(1);

  // Image error fallback
  const [imgError, setImgError] = useState(false);

  // Search input
  const [search, setSearch] = useState('');

  return (
    <div>
      <img
        src={imgError ? '/fallback.jpg' : product.image}
        onError={() => setImgError(true)}  // updates state on error
      />

      {/* Quantity picker */}
      <div className="qty-control">
        <button onClick={() => setQty(q => Math.max(1, q - 1))}>
          −
        </button>
        <span>{qty}</span>
        <button onClick={() => setQty(q => q + 1)}>
          +
        </button>
      </div>

      {/* Search box */}
      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search..."
      />
    </div>
  );
}`,
    lang: 'jsx',
    tip: 'When the new state depends on the old state, use the functional form: setQty(prev => prev + 1). This avoids stale closure bugs.',
    result: 'Components that react instantly to user actions — quantity changes, image errors, search typing.',
  },
  {
    id: 6,
    title: 'useEffect — Side Effects',
    subtitle: 'Running code after renders',
    emoji: '⚡',
    theory: `**useEffect** runs code *after* React renders the component. Use it for things that shouldn't happen during rendering: fetching data, reading localStorage, setting up event listeners, or updating the document title.

The **dependency array** controls when the effect re-runs:
- \`[]\` → run once after first render (like "on mount")
- \`[value]\` → run whenever \`value\` changes
- No array → run after every render (rarely what you want)`,
    steps: [
      'Import useEffect from React.',
      'Pass a function and a dependency array.',
      'Return a cleanup function if needed (to remove listeners).',
      'Read from or write to the outside world inside the effect.',
    ],
    code: `import { useState, useEffect } from 'react';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  // ① Runs once — sets up scroll listener
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);

    window.addEventListener('scroll', handler);

    // Cleanup: removes listener when Navbar unmounts
    return () => window.removeEventListener('scroll', handler);
  }, []); // ← empty array = run once


  // ② Runs when cart changes — saves to localStorage
  const { cart } = useApp();

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]); // ← re-runs every time cart changes


  return (
    <nav className={\`navbar\${scrolled ? ' scrolled' : ''}\`}>
      {/* ... */}
    </nav>
  );
}`,
    lang: 'jsx',
    tip: 'Always clean up effects that set up subscriptions or timers. Forgetting the cleanup causes memory leaks and bugs after navigation.',
    result: 'The Navbar changes style on scroll, and the cart automatically persists to localStorage on every change.',
  },
  {
    id: 7,
    title: 'Context API — Global State',
    subtitle: 'Cart, Wishlist & Auth shared everywhere',
    emoji: '🌐',
    theory: `**Context** solves "prop drilling" — having to pass the same prop through many layers of components just so a deeply nested child can use it.

With Context, you wrap your app in a **Provider** that holds shared state. Any component inside can read it directly with \`useContext\`, no matter how deep it is.

In Print3D Shop, Context holds the **cart**, **wishlist**, and **logged-in user** — things every page needs.`,
    steps: [
      'Create a Context with createContext().',
      'Create a Provider component that holds the state.',
      'Wrap your entire app in <AppProvider>.',
      'Any child calls useContext(AppContext) to read/update state.',
    ],
    code: `// src/context/AppContext.jsx
import { createContext, useContext, useReducer, useEffect } from 'react';

const AppContext = createContext(null);

function reducer(state, action) {
  switch (action.type) {
    case 'CART_ADD': {
      const exists = state.cart.find(i => i.id === action.payload.id);
      if (exists) {
        return {
          ...state,
          cart: state.cart.map(i =>
            i.id === action.payload.id
              ? { ...i, qty: i.qty + 1 }
              : i
          ),
        };
      }
      return { ...state, cart: [...state.cart, { ...action.payload, qty: 1 }] };
    }
    case 'CART_REMOVE':
      return { ...state, cart: state.cart.filter(i => i.id !== action.payload) };
    case 'WISH_TOGGLE': {
      const inWish = state.wishlist.find(i => i.id === action.payload.id);
      return inWish
        ? { ...state, wishlist: state.wishlist.filter(i => i.id !== action.payload.id) }
        : { ...state, wishlist: [...state.wishlist, action.payload] };
    }
    case 'SIGN_IN':  return { ...state, user: action.payload };
    case 'SIGN_OUT': return { ...state, user: null };
    default: return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    user: JSON.parse(localStorage.getItem('user')) ?? null,
    cart: JSON.parse(localStorage.getItem('cart')) ?? [],
    wishlist: JSON.parse(localStorage.getItem('wishlist')) ?? [],
  });

  // Auto-save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <AppContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

// Custom hook for easy access
export const useApp = () => useContext(AppContext);

// ── Usage in any component ───────────────────────────
// import { useApp } from '../context/AppContext';
//
// function ProductCard({ product }) {
//   const { wishlist, dispatch } = useApp();
//
//   return (
//     <button onClick={() => dispatch({ type: 'WISH_TOGGLE', payload: product })}>
//       ♥ Wishlist
//     </button>
//   );
// }`,
    lang: 'jsx',
    tip: 'useReducer is like useState but for complex state with many actions. Think of dispatch() as sending a message: "something happened, update accordingly".',
    result: 'Cart, wishlist and user are accessible in any component without passing props through every layer.',
  },
  {
    id: 8,
    title: 'React Router — Navigation',
    subtitle: 'Multiple pages in a single-page app',
    emoji: '🗺️',
    theory: `React apps are **Single Page Applications (SPAs)** — there's only one HTML file. React Router intercepts link clicks and swaps components instead of reloading the page, making navigation feel instant.

Key concepts:
- **\`<BrowserRouter>\`** — wraps the whole app, enables routing
- **\`<Routes>\`** — container for all your route definitions
- **\`<Route path="/x" element={<X/>}>\`** — shows component X when URL is /x
- **\`<Link to="/x">\`** — like \`<a>\` but doesn't reload the page
- **\`useNavigate()\`** — programmatic navigation (e.g. after form submit)
- **\`useParams()\`** — reads URL parameters like \`/product/:id\``,
    steps: [
      'Wrap your app in <BrowserRouter> in main.jsx.',
      'Define routes in App.jsx with <Routes> and <Route>.',
      'Use <Link> instead of <a> for internal navigation.',
      'Use useNavigate() to redirect after an action.',
      'Use useParams() to read dynamic URL segments.',
    ],
    code: `// src/main.jsx ─ wrap entire app
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AppProvider>
      <App />
    </AppProvider>
  </BrowserRouter>
);

// src/App.jsx ─ define all routes
import { Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/"           element={<Home />} />
        <Route path="/shop"       element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart"       element={<Cart />} />
        <Route path="/checkout"   element={<Checkout />} />
      </Routes>
      <Footer />
    </>
  );
}

// src/pages/ProductDetail.jsx ─ read the :id param
import { useParams, useNavigate } from 'react-router-dom';

export default function ProductDetail() {
  const { id } = useParams();       // e.g. "42" from /product/42
  const navigate = useNavigate();

  const product = products.find(p => p.id === +id);

  const handleBuy = () => {
    dispatch({ type: 'CART_ADD', payload: product });
    navigate('/cart');              // redirect to cart
  };

  return <button onClick={handleBuy}>Buy Now</button>;
}`,
    lang: 'jsx',
    tip: 'useSearchParams() reads query strings like /shop?cat=Toys. It works just like useState — read the param, and call setSearchParams() to change it.',
    result: 'Clicking any link updates the URL and swaps the page component — no full browser reload, instant transitions.',
  },
  {
    id: 9,
    title: 'CSS Variables & Theming',
    subtitle: 'One source of truth for all colors',
    emoji: '🎨',
    theory: `**CSS Custom Properties** (variables) let you define a color, size, or value once and reuse it everywhere. Change one line and the whole site updates.

They're defined on \`:root\` (the document) and accessed with \`var(--name)\`. This is how Print3D Shop supports its entire warm color palette from a single location.`,
    steps: [
      'Declare variables on :root in index.css.',
      'Use var(--name) anywhere in any CSS file.',
      'Change the variable in one place to retheme everything.',
      'Variables can be overridden locally inside specific selectors.',
    ],
    code: `/* src/index.css */

:root {
  /* ── Brand colors ── */
  --primary:       #f97316;   /* orange */
  --primary-dark:  #c2410c;
  --primary-light: #fdba74;
  --secondary:     #e11d48;   /* crimson */
  --accent:        #f59e0b;   /* amber */
  --gold:          #d97706;
  --terracotta:    #c0614a;

  /* ── Dark backgrounds ── */
  --bg:       #110a06;   /* darkest */
  --bg2:      #1a0f08;
  --surface:  #271610;   /* card backgrounds */

  /* ── Text ── */
  --text:     #fdf0e6;   /* warm white */
  --text2:    #c4a882;   /* muted */
  --text3:    #8a6a50;   /* very muted */

  /* ── Spacing & shape ── */
  --radius:    12px;
  --radius-lg: 20px;
}

/* Usage in any component CSS */
.product-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  color: var(--text);
}

.btn-primary {
  background: linear-gradient(135deg, var(--primary), var(--gold));
  color: #fff;
}

.btn-primary:hover {
  background: linear-gradient(135deg, var(--primary-dark), var(--accent));
  box-shadow: 0 4px 20px rgba(249, 115, 22, 0.45);
}`,
    lang: 'css',
    tip: 'You can also change CSS variables with JavaScript: document.documentElement.style.setProperty("--primary", "#ff0000"). This is how dark/light mode toggles work.',
    result: 'The entire color palette is controlled from one place — changing --primary updates every button, badge, and link at once.',
  },
  {
    id: 10,
    title: 'Building the Product Card',
    subtitle: 'A complete reusable component',
    emoji: '🃏',
    theory: `Let's put everything together to build the **ProductCard** — the most repeated component in the whole site.

It combines:
- **Props** (receives product data)
- **useState** (image error fallback, hover state)
- **useContext** (reads wishlist, dispatches actions)
- **React Router Link** (navigates to product detail)
- **Event handlers** (add to cart, toggle wishlist)`,
    steps: [
      'Accept a product prop and destructure what you need.',
      'Connect to global state for wishlist and cart.',
      'Handle image load errors gracefully.',
      'Prevent card navigation when clicking action buttons.',
      'Style with CSS — hover overlay, badge, gradient card.',
    ],
    code: `// src/components/ProductCard.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingCart } from 'react-icons/fi';
import { useApp } from '../context/AppContext';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const { wishlist, dispatch } = useApp();
  const [imgErr, setImgErr] = useState(false);

  // Check if this product is already in wishlist
  const inWish = wishlist.some(i => i.id === product.id);

  // e.preventDefault() stops the parent <Link> from navigating
  const addToCart = e => {
    e.preventDefault();
    dispatch({ type: 'CART_ADD', payload: product });
  };

  const toggleWish = e => {
    e.preventDefault();
    dispatch({ type: 'WISH_TOGGLE', payload: product });
  };

  return (
    // The whole card is a link to the product page
    <Link to={\`/product/\${product.id}\`} className="product-card">

      {/* Image section with hover overlay */}
      <div className="card-img-wrap">
        <img
          src={imgErr
            ? \`https://picsum.photos/seed/\${product.id}/400/400\`
            : product.image}
          alt={product.name}
          loading="lazy"
          onError={() => setImgErr(true)}
        />

        {/* Buttons visible only on hover (CSS handles this) */}
        <div className="card-overlay">
          <button className="overlay-btn" onClick={addToCart}>
            <FiShoppingCart />
          </button>
          <button
            className={\`overlay-btn \${inWish ? 'active' : ''}\`}
            onClick={toggleWish}
          >
            <FiHeart />
          </button>
        </div>

        {/* Conditional badge */}
        {product.badge && (
          <span className="card-badge badge">{product.badge}</span>
        )}
      </div>

      {/* Text section */}
      <div className="card-body">
        <p className="card-category">{product.category}</p>
        <h3 className="card-name">{product.name}</h3>
        <div className="card-footer">
          <span className="card-price">\${product.price.toFixed(2)}</span>
          <button className="btn btn-primary" onClick={addToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
}`,
    lang: 'jsx',
    tip: 'Notice e.preventDefault() on the button clicks. Without it, clicking "Add to Cart" would also follow the <Link> and navigate away — not what we want.',
    result: 'A fully interactive product card with hover effects, wishlist toggle, add-to-cart, and graceful image fallback.',
  },
  {
    id: 11,
    title: 'Forms & Validation',
    subtitle: 'Sign In, Sign Up, and Checkout forms',
    emoji: '📋',
    theory: `Forms in React are **controlled components** — React state is the single source of truth for every input's value. This gives you full control for validation, formatting, and conditional UI.

The pattern is always the same:
1. State holds the form data
2. \`onChange\` updates state as the user types
3. \`onSubmit\` validates before doing anything
4. Errors are stored in state and displayed next to the field`,
    steps: [
      'Create a state object for all fields.',
      'Connect each input\'s value and onChange to state.',
      'Write a validate() function that returns an errors object.',
      'Show errors below each field when they exist.',
      'Only proceed (submit/navigate) when errors is empty.',
    ],
    code: `// src/pages/SignIn.jsx (simplified)
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function SignIn() {
  // ① State for fields and errors
  const [form, setForm]     = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const { dispatch } = useApp();
  const navigate = useNavigate();

  // ② Generic change handler — works for any field
  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' })); // clear error on type
  };

  // ③ Validation — returns an object of errors
  const validate = () => {
    const e = {};
    if (!form.email.includes('@')) e.email = 'Valid email required';
    if (form.password.length < 6)  e.password = 'Min 6 characters';
    return e;
  };

  // ④ Submit handler
  const handleSubmit = e => {
    e.preventDefault();            // prevent page reload

    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);             // show errors
      return;                      // stop here
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      dispatch({ type: 'SIGN_IN', payload: { email: form.email } });
      navigate('/');               // redirect on success
    }, 800);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email</label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
        />
        {/* ⑤ Show error if it exists */}
        {errors.email && <p className="error">{errors.email}</p>}
      </div>

      <div>
        <label>Password</label>
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
        />
        {errors.password && <p className="error">{errors.password}</p>}
      </div>

      <button type="submit" disabled={loading}>
        {loading ? 'Signing in…' : 'Sign In'}
      </button>
    </form>
  );
}`,
    lang: 'jsx',
    tip: 'The generic handleChange handler uses e.target.name to update the right field — so one function handles all inputs. Make sure each <input> has a name attribute matching your form state keys.',
    result: 'A robust sign-in form that validates before submitting, shows field-level errors, and redirects on success.',
  },
  {
    id: 12,
    title: 'Filtering & Searching',
    subtitle: 'useMemo for expensive computations',
    emoji: '🔍',
    theory: `The Shop page filters 108 products by category, price, rating, material, and search text — all in real time as the user adjusts filters.

**\`useMemo\`** caches the result of an expensive calculation and only re-runs it when its dependencies change. Without it, filtering all 108 products on every keystroke or render would be wasteful.`,
    steps: [
      'Store all filter values in state.',
      'Use useMemo to compute the filtered list.',
      'The dependency array tells React when to recompute.',
      'Render the filtered list — React handles the rest.',
    ],
    code: `// src/pages/Shop.jsx (simplified)
import { useState, useMemo } from 'react';
import { products } from '../data/products';

export default function Shop() {
  // Filter state
  const [search,      setSearch]      = useState('');
  const [selectedCat, setSelectedCat] = useState('');
  const [maxPrice,    setMaxPrice]    = useState(100);
  const [minRating,   setMinRating]   = useState(0);
  const [sort,        setSort]        = useState('featured');

  // useMemo recomputes only when a dependency changes
  const filtered = useMemo(() => {
    let list = [...products];

    // 1. Text search
    if (search) {
      list = list.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())
      );
    }

    // 2. Category filter
    if (selectedCat) {
      list = list.filter(p => p.category === selectedCat);
    }

    // 3. Price filter
    list = list.filter(p => p.price <= maxPrice);

    // 4. Rating filter
    list = list.filter(p => p.rating >= minRating);

    // 5. Sort
    if (sort === 'price-asc')  list.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
    if (sort === 'rating')     list.sort((a, b) => b.rating - a.rating);

    return list;

  }, [search, selectedCat, maxPrice, minRating, sort]);
  //  ↑ Dependencies — recompute when any of these change

  return (
    <div>
      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search 108 products..."
      />

      <p>{filtered.length} products found</p>

      <div className="products-grid">
        {filtered.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}`,
    lang: 'jsx',
    tip: 'useMemo is an optimisation. Start without it first — if filtering feels slow, add it. Don\'t optimise prematurely.',
    result: 'Real-time filtering of 108 products across 5 dimensions, without lag or unnecessary recalculation.',
  },
];
