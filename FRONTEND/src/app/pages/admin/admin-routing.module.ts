import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule, Routes } from "@angular/router";
import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";
import { UserComponent } from "./user/user.component";
import { UsersComponent } from "./users/users.component";

const routes: Routes = [
  {
    path: "dashboard",
    component: AdminDashboardComponent,
    children: [
      {
        path: "users",
        component: UsersComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
