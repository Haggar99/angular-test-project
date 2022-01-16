import { Injectable } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';
import { Product } from '../modals/product';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = 'https://fakestoreapi.com/products';
  private _products = new BehaviorSubject<Product[]>([]);

  constructor(
    private httpClient: HttpClient
  ) { 
  }

  fetchProducts() {
    return this.httpClient.get<Product[]>(this.url)
    .pipe(
      tap(products => {
        this._products.next(products);
      })
    )
  }

  get products() {
    return this._products.asObservable();
  }
  
}
