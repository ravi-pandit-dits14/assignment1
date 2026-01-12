import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { CartItem } from '../models';
import { CartState, addToCart, clearCart, removeFromCart, updateCartItemQuantity } from '../store/cart';
import { Product } from '../models';

const CART_STORAGE_KEY = 'shopping_cart';

@Injectable({
  providedIn: 'root',
})
export class CartStorageService {
  private store = inject(Store<{ cart: CartState }>);

  saveCartToLocalStorage(items: CartItem[]): void {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error('Error saving cart to localStorage', error);
    }
  }

  loadCartFromLocalStorage(): CartItem[] {
    try {
      const cart = localStorage.getItem(CART_STORAGE_KEY);
      return cart ? JSON.parse(cart) : [];
    } catch (error) {
      console.error('Error loading cart from localStorage', error);
      return [];
    }
  }

  clearLocalStorage(): void {
    try {
      localStorage.removeItem(CART_STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing cart from localStorage', error);
    }
  }

  addToCart(product: Product, size?: string): void {
    this.store.dispatch(addToCart({ product, size }));
  }

  removeFromCart(productId: number, size?: string): void {
    this.store.dispatch(removeFromCart({ productId, size }));
  }

  updateQuantity(productId: number, quantity: number, size?: string): void {
    this.store.dispatch(updateCartItemQuantity({ productId, quantity, size }));
  }

  clearCart(): void {
    this.store.dispatch(clearCart());
  }

  isProductInCart(productId: number, size?: string): boolean {
    const cart = this.loadCartFromLocalStorage();
    return cart.some((item) => item.id === productId && (!size || item.size === size));
  }
}
