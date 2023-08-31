import { NgModule } from '@angular/core';
import {UserviewComponent} from "../../shared/userview/userview.component";
import {AppModule} from "../../app.module";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {AllusersComponent} from "./allusers.component";
import {ChatComponent} from "./chat/chat.component";
import { ShowuserComponent } from './showuser/showuser.component';
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {AllusersRoutingModule} from "./allusers-routing.module";
import {MatLegacyButtonModule} from "@angular/material/legacy-button";


@NgModule({
  declarations: [AllusersComponent, ChatComponent, ShowuserComponent],
    imports: [
        FormsModule,
        CommonModule,
        MatCardModule,
        MatIconModule,
        AllusersRoutingModule,
        MatLegacyButtonModule
    ]
})
export class AllusersModule { }
