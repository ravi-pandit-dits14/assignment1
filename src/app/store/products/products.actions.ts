import { createAction, props } from '@ngrx/store';
import { Product } from '../../models';

export const loadProducts = createAction('[Products Page] Load Products');

export const loadProductsSuccess = createAction(
  '[Products Page] Load Products Success',
  props<{ products: Product[] }>()
);

export const loadProductsFailure = createAction(
  '[Products Page] Load Products Failure',
  props<{ error: string }>()
);
