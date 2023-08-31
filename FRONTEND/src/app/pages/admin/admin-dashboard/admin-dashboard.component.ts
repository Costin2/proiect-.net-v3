import { Component, OnInit } from '@angular/core';
import { UserService } from "../../../core/services/user.service";
import { AuthService } from "../../../core/services/auth.service";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  public users: any = [];
  public admins: any = [];

  constructor(private readonly userService: UserService, private readonly authService: AuthService) {
  }

  ngOnInit(): void {
    this.userService.getAllUsersAdmin(this.authService.getToken()).subscribe(data => {
      this.users = data.item1;
      this.admins = data.item2;
    });
  }


}
