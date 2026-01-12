import { createReducer, on } from '@ngrx/store';
import { CartItem } from '../../models';
import * as CartActions from './cart.actions';

export interface CartState {
  items: CartItem[];
}

export const initialState: CartState = {
  items: [],
};

export const cartReducer = createReducer(
  initialState,
  on(CartActions.addToCart, (state, { product }) => {
    const existingItem = state.items.find((item) => item.id === product.id);

    if (existingItem) {
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };
    }

    return {
      ...state,
      items: [...state.items, { ...product, quantity: 1 }],
    };
  }),
  on(CartActions.removeFromCart, (state, { productId }) => ({
    ...state,
    items: state.items.filter((item) => item.id !== productId),
  })),
  on(CartActions.updateCartItemQuantity, (state, { productId, quantity }) => ({
    ...state,
    items: state.items.map((item) =>
      item.id === productId ? { ...item, quantity } : item
    ),
  })),
  on(CartActions.clearCart, () => ({
    ...initialState,
  })),
  on(CartActions.saveCartToStorage, (state, { items }) => ({
    ...state,
    items,
  }))
);
