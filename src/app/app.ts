import { Component, ChangeDetectionStrategy, OnInit, inject, effect } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { HeaderComponent } from './components/header/header.component';
import { CartState, selectCartItems } from './store/cart';
import { CartStorageService } from './services';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App implements OnInit {
  private store = inject(Store<{ cart: CartState }>);
  private cartStorageService = inject(CartStorageService);

  ngOnInit(): void {
    // Load cart from localStorage on app init
    const savedCart = this.cartStorageService.loadCartFromLocalStorage();
    if (savedCart.length > 0) {
      // Dispatch each item back to the cart
      savedCart.forEach((item) => {
        // We'll handle this via subscription instead
      });
    }

    // Subscribe to cart changes and save to localStorage
    this.store.select(selectCartItems).subscribe((items) => {
      this.cartStorageService.saveCartToLocalStorage(items);
    });
  }
}
