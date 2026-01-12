import { Component, OnInit, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { GalleriaModule } from 'primeng/galleria';
import { ProductService, CartStorageService } from '../../services';
import { Product } from '../../models';
import { map } from 'rxjs/operators';

interface Review {
  id: number;
  author: string;
  rating: number;
  date: string;
  text: string;
  verified: boolean;
}

const AVAILABLE_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    CardModule,
    ButtonModule,
    RatingModule,
    ProgressSpinnerModule,
    FormsModule,
    InputNumberModule,
    GalleriaModule,
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private cartService = inject(CartStorageService);
  private router = inject(Router);
  private store = inject(Store);

  product = signal<Product | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);
  quantity = signal(1);
  selectedSize = signal<string | null>(null);
  isInCart = signal(false);
  availableSizes = AVAILABLE_SIZES;

  // Mock reviews data
  reviews: Review[] = [
    {
      id: 1,
      author: 'John Smith',
      rating: 5,
      date: '2 weeks ago',
      text: 'Excellent product! Great quality and fast shipping. Highly recommended!',
      verified: true,
    },
    {
      id: 2,
      author: 'Sarah Johnson',
      rating: 4,
      date: '1 month ago',
      text: 'Very good product. Matches the description perfectly. Good value for money.',
      verified: true,
    },
    {
      id: 3,
      author: 'Mike Davis',
      rating: 5,
      date: '1 month ago',
      text: 'Amazing! Exceeded my expectations. Will definitely order again.',
      verified: true,
    },
    {
      id: 4,
      author: 'Emily Brown',
      rating: 4,
      date: '2 months ago',
      text: 'Good quality but took longer to arrive than expected.',
      verified: true,
    },
    {
      id: 5,
      author: 'Alex Wilson',
      rating: 5,
      date: '2 months ago',
      text: 'Perfect! Exactly as described. Fantastic customer service too!',
      verified: true,
    },
  ];

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.productService.getProductById(parseInt(id, 10)).subscribe({
        next: (product) => {
          this.product.set(product);
          this.loading.set(false);
          this.checkIfInCart();
        },
        error: (err) => {
          this.error.set('Failed to load product details');
          this.loading.set(false);
        },
      });
    });
  }

  checkIfInCart(): void {
    const currentProduct = this.product();
    if (currentProduct && this.selectedSize()) {
      const inCart = this.cartService.isProductInCart(currentProduct.id, this.selectedSize() || undefined);
      this.isInCart.set(inCart);
    }
  }

  addToCart(): void {
    const currentProduct = this.product();
    const size = this.selectedSize();

    if (!size) {
      alert('Please select a size first');
      return;
    }

    if (!currentProduct) return;

    if (this.isInCart()) {
      this.router.navigate(['/cart']);
    } else {
      for (let i = 0; i < this.quantity(); i++) {
        this.cartService.addToCart(currentProduct, size);
      }
      this.quantity.set(1);
      this.isInCart.set(true);
    }
  }

  onSizeSelected(size: string): void {
    this.selectedSize.set(size);
    this.checkIfInCart();
    this.quantity.set(1);
  }

  getAverageRating(): number {
    if (this.reviews.length === 0) return 0;
    const sum = this.reviews.reduce((acc, review) => acc + review.rating, 0);
    return Math.round((sum / this.reviews.length) * 10) / 10;
  }

  getRatingDistribution(): { rating: number; count: number; percentage: number }[] {
    const distribution = [
      { rating: 5, count: 0 },
      { rating: 4, count: 0 },
      { rating: 3, count: 0 },
      { rating: 2, count: 0 },
      { rating: 1, count: 0 },
    ];

    this.reviews.forEach((review) => {
      const item = distribution.find((d) => d.rating === review.rating);
      if (item) item.count++;
    });

    return distribution.map((item) => ({
      ...item,
      percentage: (item.count / this.reviews.length) * 100,
    }));
  }
}
