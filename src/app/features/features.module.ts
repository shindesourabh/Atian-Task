import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeaturesRoutingModule } from './features-routing.module';
import { BookListComponent } from './book-list/book-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SerchfilterPipe } from '../serchfilter.pipe';


@NgModule({
  declarations: [
    BookListComponent,
    DashboardComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class FeaturesModule { }
