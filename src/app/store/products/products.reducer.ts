import { createReducer, on } from '@ngrx/store';
import { Product } from '../../models';
import * as ProductsActions from './products.actions';

export interface ProductsState {
  items: Product[];
  loading: boolean;
  error: string | null;
}

export const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
};

export const productsReducer = createReducer(
  initialState,
  on(ProductsActions.loadProducts, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ProductsActions.loadProductsSuccess, (state, { products }) => ({
    ...state,
    items: products,
    loading: false,
    error: null,
  })),
  on(ProductsActions.loadProductsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
