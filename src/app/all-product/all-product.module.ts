import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllProductRoutingModule } from './all-product-routing.module';
import { AllProductComponent } from './all-product.component';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatMenuModule} from '@angular/material/menu';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressBarModule} from '@angular/material/progress-bar';
@NgModule({
  declarations: [
    AllProductComponent
  ],
  imports: [
    CommonModule,
    AllProductRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbRatingModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatSelectModule,
    MatProgressBarModule
  ]
})
export class AllProductModule { }
