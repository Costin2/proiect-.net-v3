import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./pages/home/home.component";

import { AuthGuard } from "./core/guards/auth.guard";
import { AdminGuard } from "./core/guards/admin.guard";
import { NotAuthGuard } from "./core/guards/not-auth.guard";

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'admin',
    canActivate: [AdminGuard],
    loadChildren: () => import('./pages/admin/admin.module').then(a => a.AdminModule)
  },
  {
    path: 'auth',
    canActivate: [NotAuthGuard],
    loadChildren: () => import('./pages/auth/auth.module').then(a => a.AuthModule)
  },
  {
    path: 'allusers',
    loadChildren: () => import('./pages/allusers/allusers.module').then(a => a.AllusersModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
