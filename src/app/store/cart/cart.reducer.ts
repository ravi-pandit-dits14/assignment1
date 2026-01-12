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
  on(CartActions.addToCart, (state, { product, size }) => {
    const existingItem = state.items.find((item) => item.id === product.id && (!size || item.size === size));

    if (existingItem && existingItem.quantity < 10) {
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === product.id && (!size || item.size === size)
            ? { ...item, quantity: Math.min(item.quantity + 1, 10) }
            : item
        ),
      };
    }

    if (!existingItem) {
      return {
        ...state,
        items: [...state.items, { ...product, quantity: 1, size }],
      };
    }

    return state;
  }),
  on(CartActions.removeFromCart, (state, { productId, size }) => ({
    ...state,
    items: state.items.filter((item) => !(item.id === productId && (!size || item.size === size))),
  })),
  on(CartActions.updateCartItemQuantity, (state, { productId, quantity, size }) => ({
    ...state,
    items: state.items.map((item) =>
      item.id === productId && (!size || item.size === size) ? { ...item, quantity: Math.min(quantity, 10) } : item
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
