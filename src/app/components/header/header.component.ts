import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { CartState, selectCartItemCount } from '../../store/cart';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule, ToolbarModule],
  template: `
    <p-toolbar class="mb-4">
      <div pToolbarLeft class="toolbar-left">
        <h1 class="app-title">Shopping Cart</h1>
      </div>
      <div pToolbarRight>
        <div class="cart-icon-wrapper">
          <button
            pButton
            type="button"
            icon="pi pi-shopping-cart"
            class="cart-button"
            routerLink="/cart"
          ></button>
          <span class="cart-badge" *ngIf="cartItemCount$ | async as count">
            {{ count }}
          </span>
        </div>
      </div>
    </p-toolbar>
  `,
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private store = inject(Store<{ cart: CartState }>);
  cartItemCount$ = this.store.select(selectCartItemCount);
}
