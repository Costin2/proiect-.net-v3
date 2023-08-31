import {Component, OnInit} from '@angular/core';
import {BasicUserDTO} from "../../DTOs/BasicUserDTO";
import {UserService} from "../../core/services/user.service";
import {AuthService} from "../../core/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-allusers',
  templateUrl: './allusers.component.html',
  styleUrls: ['./allusers.component.scss']
})
export class AllusersComponent implements OnInit{
  public users:any = [];


  constructor(private readonly userService: UserService, private readonly authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.userService.AllUsers().subscribe(response => {
      for (let usr of response) {
        if (usr.userName != this.authService.getId()) {
          this.users.push(new BasicUserDTO(usr.id, usr.userName, usr.profilePicture, usr.firstName, usr.lastName));
        }
      }
    })
    console.log(this.users);
  }

  utilizatorApasat(event: any) {
    this.router.navigate(['allusers/users/chat/' + event])
  }
}
