import {
  createContext,
  useContext,
  useMemo,
  useReducer,
} from "react";

import {
  initialState,
  storeReducer,
} from "./storeReducer";

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(
    storeReducer,
    initialState
  );

  const cartCount = state.cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartTotal = state.cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const value = useMemo(
    () => ({
      cart: state.cart,
      user: state.user,
      cartCount,
      cartTotal,
      dispatch,
    }),
    [state.cart, state.user, cartCount, cartTotal]
  );

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error(
      "useStore must be used inside StoreProvider"
    );
  }

  return context;
}