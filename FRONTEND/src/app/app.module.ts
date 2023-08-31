import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './pages/admin/user/user.component';
import { UsersComponent } from './pages/admin/users/users.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { MeniuComponent } from './shared/meniu/meniu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatLegacyListModule } from "@angular/material/legacy-list";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { MatLegacyButtonModule } from "@angular/material/legacy-button";
import { MatButtonModule } from "@angular/material/button";
import { UserviewComponent } from './shared/userview/userview.component';
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { AllusersComponent } from './pages/allusers/allusers.component';
import { ChatComponent } from './pages/allusers/chat/chat.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MeniuComponent,
    UserviewComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
  ],
  providers: [],
  exports: [
    UserviewComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
