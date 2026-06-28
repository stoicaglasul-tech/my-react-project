import { createContext, useContext, useReducer, useEffect } from 'react';

const AppContext = createContext(null);

const load = (key, fallback) => {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
  catch { return fallback; }
};

function reducer(state, action) {
  switch (action.type) {
    case 'SIGN_IN': return { ...state, user: action.payload };
    case 'SIGN_OUT': return { ...state, user: null };

    case 'CART_ADD': {
      const exists = state.cart.find(i => i.id === action.payload.id);
      if (exists) {
        return { ...state, cart: state.cart.map(i => i.id === action.payload.id ? { ...i, qty: i.qty + 1 } : i) };
      }
      return { ...state, cart: [...state.cart, { ...action.payload, qty: 1 }] };
    }
    case 'CART_REMOVE':
      return { ...state, cart: state.cart.filter(i => i.id !== action.payload) };
    case 'CART_UPDATE_QTY':
      return { ...state, cart: state.cart.map(i => i.id === action.payload.id ? { ...i, qty: action.payload.qty } : i) };
    case 'CART_CLEAR':
      return { ...state, cart: [] };

    case 'WISH_TOGGLE': {
      const inWish = state.wishlist.find(i => i.id === action.payload.id);
      if (inWish) return { ...state, wishlist: state.wishlist.filter(i => i.id !== action.payload.id) };
      return { ...state, wishlist: [...state.wishlist, action.payload] };
    }
    case 'WISH_REMOVE':
      return { ...state, wishlist: state.wishlist.filter(i => i.id !== action.payload) };

    default: return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    user: load('user', null),
    cart: load('cart', []),
    wishlist: load('wishlist', []),
  });

  useEffect(() => { localStorage.setItem('cart', JSON.stringify(state.cart)); }, [state.cart]);
  useEffect(() => { localStorage.setItem('wishlist', JSON.stringify(state.wishlist)); }, [state.wishlist]);
  useEffect(() => { localStorage.setItem('user', JSON.stringify(state.user)); }, [state.user]);

  const cartCount = state.cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = state.cart.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <AppContext.Provider value={{ ...state, dispatch, cartCount, cartTotal }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
