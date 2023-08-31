import { Component, Input, OnInit } from '@angular/core';
import { UserService } from "../../../core/services/user.service";
import { AuthService } from "../../../core/services/auth.service";
import { UserAdmin } from "../../../DTOs/UserAdmin";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  @Input() users: any = []
  @Input() isForAdmins: any = false;

  constructor(private readonly userService: UserService, private readonly authService: AuthService) {
  }

  ngOnInit(): void {
  }

}
