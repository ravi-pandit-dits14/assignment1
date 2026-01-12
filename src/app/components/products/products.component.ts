import { Component, ChangeDetectionStrategy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RatingModule } from 'primeng/rating';
import { loadProducts, selectAllProducts, selectProductsLoading, selectProductsError } from '../../store/products';
import { CartStorageService } from '../../services';
import { Product } from '../../models';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    ButtonModule,
    ProgressSpinnerModule,
    RatingModule,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent implements OnInit {
  private store = inject(Store);
  private cartService = inject(CartStorageService);

  products$ = this.store.select(selectAllProducts);
  loading$ = this.store.select(selectProductsLoading);
  error$ = this.store.select(selectProductsError);

  ngOnInit(): void {
    this.store.dispatch(loadProducts());
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }

  trackByProductId(index: number, product: Product): number {
    return product.id;
  }
}
