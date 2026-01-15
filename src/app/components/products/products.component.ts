import { Component, ChangeDetectionStrategy, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { loadProducts, selectAllProducts, selectProductsLoading, selectProductsError } from '../../store/products';
import { CartStorageService } from '../../services';
import { Product } from '../../models';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    CardModule,
    ButtonModule,
    ProgressSpinnerModule,
    RatingModule,
    InputTextModule,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent implements OnInit {
  private store = inject(Store);

  products$ = this.store.select(selectAllProducts);
  loading$ = this.store.select(selectProductsLoading);
  error$ = this.store.select(selectProductsError);

  searchQuery = signal('');
  selectedCategory = signal<string | null>(null);

  allProducts = signal<Product[]>([]);
  categories = signal<string[]>([]);

  filteredProducts = computed(() => {
    const products = this.allProducts();
    const search = this.searchQuery().toLowerCase();
    const category = this.selectedCategory();

    return products.filter((product) => {
      const matchesSearch =
        search === '' ||
        product.title.toLowerCase().includes(search) ||
        product.description.toLowerCase().includes(search);

      const matchesCategory = !category || product.category === category;

      return matchesSearch && matchesCategory;
    });
  });

  ngOnInit(): void {
    this.store.dispatch(loadProducts());
    this.products$.subscribe((products) => {
      this.allProducts.set(products);
      const uniqueCategories = [...new Set(products.map((p) => p.category))].sort();
      this.categories.set(uniqueCategories);
    });
  }

  onSearch(query: string): void {
    this.searchQuery.set(query);
  }

  selectCategory(category: string | null): void {
    this.selectedCategory.set(this.selectedCategory() === category ? null : category);
  }

  trackByProductId(index: number, product: Product): number {
    return product.id;
  }
}
