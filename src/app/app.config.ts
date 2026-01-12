import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient } from '@angular/common/http';
import { productsReducer } from './store/products';
import { cartReducer } from './store/cart';
import { ProductsEffects } from './store/products/products.effects';
import { CartEffects } from './store/cart/cart.effects';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    provideStore({
      products: productsReducer,
      cart: cartReducer,
    }),
    provideEffects([ProductsEffects, CartEffects]),
  ]
};
