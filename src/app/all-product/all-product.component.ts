import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Product } from '../shared/modals/product';
import { ProductService } from '../shared/services/product.service';
interface FilterModel{
    category: string;
    priceMax: number;
    priceMin: number;
    rating: number;
}
@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.scss']
})
export class AllProductComponent implements OnInit {
  currentPage = 1;
  total = 0;
  pageSize = 5;
  pageSizeOptions = [3, 5, 10];

  products: Product[] = [];
  isLoading!: boolean;
  categories: string[] = [];
  selected = 'option';
  multiFiler!: FilterModel;
  filterForm!: FormGroup;
  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder
  ) { 
    this.isLoading = true;
    this.productService.fetchProducts().subscribe(() => {
      this.isLoading = false;
      });
  }
  @HostListener('mousemove', ['$event'])
  @HostListener('mouseenter', ['$event'])
  @HostListener('mouseout', ['$event'])
  onEvent(event: any) {
    if((event.x < 0 && event.x < 1200) || (event.y > 0 && event.y < 115)){
    const filter = {
      category: this.filterForm.value.category,
      priceMax: this.filterForm.value.priceMax,
      priceMin: this.filterForm.value.priceMin,
      rating: this.filterForm.value.rating
    };
    this.getProduct(filter);
  }
  }
  ngOnInit(): void {
    this.filterFormInit();
    this.getProduct();
  }
  filterFormInit() {
    this.filterForm = this.formBuilder.group({
      category: [''],
      priceMax: [''],
      priceMin: [''],
      rating: ['']
    });
  }

  getProduct(multiFilter?: FilterModel){
    this.productService.products.subscribe(products => {
      this.categories = products
      .map(p => p.category)
      .filter((c, index, array) => array
      .indexOf(c) === index)
      .sort();
      if (multiFilter?.category) {
        products = products.filter(p => p.category === multiFilter.category);
      }
      if (multiFilter?.priceMax && multiFilter?.priceMin) {
        products = products.filter(p => p.price >= multiFilter.priceMin && p.price <= multiFilter.priceMax);
      }
      if (multiFilter?.rating) {
        products = products.filter(p => p.rating.rate >= multiFilter.rating);
      }
      this.products = products
      .slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
      this.total = products.length;
    });
  }


 async onPageChange(event: PageEvent){
    this.isLoading = true;
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    await this.getProduct();
    this.isLoading = false;
  }
}
