import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "../home/home.component";
import {AdminGuard} from "../../core/guards/admin.guard";
import {AuthGuard} from "../../core/guards/auth.guard";
import {AllusersComponent} from "./allusers.component";
import {ChatComponent} from "./chat/chat.component";



const routes: Routes = [
  {
    path: 'users',
    component: AllusersComponent,
    children: [
      {
        path:'chat/:username',
        canActivate:[AuthGuard],
        component:ChatComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllusersRoutingModule { }
