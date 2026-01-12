import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import * as CartActions from './cart.actions';

const CART_STORAGE_KEY = 'shopping_cart';

@Injectable()
export class CartEffects {
  private actions$ = inject(Actions);

  saveCartToStorage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          CartActions.addToCart,
          CartActions.removeFromCart,
          CartActions.updateCartItemQuantity,
          CartActions.clearCart
        ),
        tap((action) => {
          // These actions will trigger the store to save cart to localStorage
          // We'll use a different approach with store subscription in the service
        })
      ),
    { dispatch: false }
  );
}
