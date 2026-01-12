import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { MessageModule } from 'primeng/message';
import { CardModule } from 'primeng/card';
import { CartState, selectCartItems, selectCartTotal } from '../../store/cart';
import { CartStorageService } from '../../services';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    TableModule,
    ButtonModule,
    InputNumberModule,
    MessageModule,
    CardModule,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent {
  private cartService = inject(CartStorageService);
  private store = inject(Store<{ cart: CartState }>);

  cartItems$ = this.store.select(selectCartItems);
  cartTotal$ = this.store.select(selectCartTotal);

  removeFromCart(productId: number, size?: string): void {
    this.cartService.removeFromCart(productId, size);
  }

  updateQuantity(productId: number, quantity: number, size?: string): void {
    if (quantity > 0 && quantity <= 10) {
      this.cartService.updateQuantity(productId, quantity, size);
    }
  }

  clearCart(): void {
    if (confirm('Are you sure you want to clear your cart?')) {
      this.cartService.clearCart();
    }
  }

  checkout(): void {
    alert('Thank you for your purchase! This is a demo application.');
    this.cartService.clearCart();
  }
}
