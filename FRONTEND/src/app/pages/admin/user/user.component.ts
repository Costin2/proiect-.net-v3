import { Component, Input, OnInit } from '@angular/core';
import { LoggedUser } from "../../../DTOs/LoggedUser";
import { UserAdmin } from "../../../DTOs/UserAdmin";
import { FileuploadService } from "../../../core/services/fileupload.service";
import { UserService } from "../../../core/services/user.service";
import { AuthService } from "../../../core/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  @Input() user: UserAdmin = new UserAdmin();
  public imagine: any = null;
  @Input() normalUser: any = false;

  constructor(private fileservice: FileuploadService, private userservice: UserService, private authservice: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    console.log(this.user);
    this.fileservice.getPhoto(this.user.profilePicture).subscribe(response => {
      this.imagine = 'data:image/jpeg;base64,' + response.fileContents;
    });
  }

  stergeUtilizator() {
    console.log(this.user.id);
    this.userservice.deleteUser(this.user.id, this.authservice.getToken()).subscribe(response => {
      console.log("done");
      location.reload();

    },
      error => {
        console.log(error.error);
      })
  }

  makeAdmin() {
    this.userservice.MakeAdmin(this.user.id, this.authservice.getToken()).subscribe(
      response => {
        console.log("done");
        location.reload();
      },
      error => {
        console.log(error.error);
      }
    )
  }
}
