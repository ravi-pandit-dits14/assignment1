import { createAction, props } from '@ngrx/store';
import { CartItem, Product } from '../../models';

export const addToCart = createAction(
  '[Cart] Add To Cart',
  props<{ product: Product }>()
);

export const removeFromCart = createAction(
  '[Cart] Remove From Cart',
  props<{ productId: number }>()
);

export const updateCartItemQuantity = createAction(
  '[Cart] Update Item Quantity',
  props<{ productId: number; quantity: number }>()
);

export const clearCart = createAction('[Cart] Clear Cart');

export const loadCartFromStorage = createAction('[Cart] Load From Storage');

export const saveCartToStorage = createAction(
  '[Cart] Save To Storage',
  props<{ items: CartItem[] }>()
);
