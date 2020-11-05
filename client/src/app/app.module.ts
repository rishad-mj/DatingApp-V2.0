import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from  '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountService } from './_Services/account.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailsComponent } from './members/member-details/member-details.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './members/messages/messages.component';
import { ToastrModule } from 'ngx-toastr';
import { ErrorinterceptorInterceptor } from './interceptors/errorinterceptor.interceptor';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import {TabsModule} from 'ngx-bootstrap/tabs';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { TextInputComponent } from './_form/text-input/text-input.component';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import { DateInputComponent } from './_form/text-input/date-input/date-input.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { AdminPanelComponent } from './Admin/admin-panel/admin-panel.component';
import { HasRoleDirective } from './Directives/has-role.directive';
import { UserManagementComponent } from './Admin/user-management/user-management.component';
import { PhotoManagementComponent } from './Admin/photo-management/photo-management.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { RolesModalsComponent } from './Modals/roles-modals/roles-modals.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    MemberListComponent,
    MemberDetailsComponent,
    ListsComponent,
    MessagesComponent,
    MemberCardComponent,
    MemberEditComponent,
    TextInputComponent,
    DateInputComponent,
    AdminPanelComponent,
    HasRoleDirective,
    UserManagementComponent,
    PhotoManagementComponent,
    RolesModalsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({
      positionClass:'toast-bottom-right'
    }),
    BsDatepickerModule.forRoot(),
    TabsModule.forRoot(),
    NgxGalleryModule,
    NgxSpinnerModule,
    PaginationModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [
    AccountService,
    {provide:HTTP_INTERCEPTORS,useClass:ErrorinterceptorInterceptor,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:JwtInterceptor,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:LoadingInterceptor,multi:true}

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
