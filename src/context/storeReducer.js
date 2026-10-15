export const initialState = {
  cart: [],
  user: null,
};

export function storeReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART": {
      const product = action.product;

      const existingItem = state.cart.find(
        (item) => item.id === product.id
      );

      const cart = existingItem
        ? state.cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...state.cart, { ...product, quantity: 1 }];

      return { ...state, cart };
    }

    case "INCREASE_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };

    case "DECREASE_QUANTITY":
      return {
        ...state,
        cart: state.cart
          .map((item) =>
            item.id === action.id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0),
      };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter(
          (item) => item.id !== action.id
        ),
      };

    case "CLEAR_CART":
      return { ...state, cart: [] };

    case "LOGIN":
      return { ...state, user: action.user };

    case "LOGOUT":
      return { ...state, user: null };

    default:
      return state;
  }
}