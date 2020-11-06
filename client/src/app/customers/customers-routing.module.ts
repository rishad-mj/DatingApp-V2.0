import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Customer1Component } from './customer1/customer1.component';

import { CustomersComponent } from './customers.component';

const routes: Routes = [
  { path: '', component: CustomersComponent },
  { path: 'customer1', component: Customer1Component }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
