import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AdminPanelComponent } from './Admin/admin-panel/admin-panel.component';
import { NotFoundComponent } from './Errors/not-found/not-found.component';
import { ServerErrorComponent } from './Errors/server-error/server-error.component';
import { TestErrorsComponent } from './Errors/test-errors/test-errors.component';
import { AdminGuard } from './Guards/admin.guard';
import { AuthGuard } from './Guards/auth.guard';
import { PreventUnsavedChangesGuard } from './Guards/prevent-unsaved-changes.guard';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './lists/lists.component';
import { MemberDetailsComponent } from './members/member-details/member-details.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './members/messages/messages.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {
    path:'',
   runGuardsAndResolvers:'always',
   canActivate:[AuthGuard],
   children:[
    {path:'members',component:MemberListComponent},
    {path:'members/edit',component:MemberEditComponent,canDeactivate:[PreventUnsavedChangesGuard]},
    {path:'members/:name',component:MemberDetailsComponent},
    {path:'lists',component:ListsComponent},
    {path:'messages',component:MessagesComponent},
    {path:"admin",component:AdminPanelComponent,canActivate:[AdminGuard]},
   ]
  },
  {path:'errors',component:TestErrorsComponent},
  {path:'not-found',component:NotFoundComponent},
  {path:'server-error',component:ServerErrorComponent},
  {path: 'customers', loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule) },
  {path: 'orders', loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule) },
  {path:'**',component:HomeComponent,pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {
      preloadingStrategy:PreloadAllModules
    }
    
    )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
