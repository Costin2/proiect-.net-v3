import { Component } from '@angular/core';
import { FormBuilder } from "@angular/forms";
import { AuthService } from "../../../core/services/auth.service";
import { UserLogin } from "../../../DTOs/UserLogin";
import { UserRegister } from "../../../DTOs/UserRegister";
import { Router } from "@angular/router";
import { LoggedUser } from "../../../DTOs/LoggedUser";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = "";
  password: string = "";

  errorMessage: any = null;

  constructor(private readonly authservice: AuthService, private router: Router) {

  }

  login() {
    let usrlog: UserLogin = new UserLogin(this.username, this.password);
    this.authservice.loginUser(usrlog).subscribe(response => {
      console.log("te ai logat fraiere");
      this.errorMessage = null;
      console.log(response);
      var loggedinUser: LoggedUser = new LoggedUser();
      loggedinUser.username = response.userName;
      loggedinUser.firstName = response.firstName;
      loggedinUser.lastName = response.lastName;
      loggedinUser.email = response.email;
      loggedinUser.picture = response.profilePicture;
      loggedinUser.admin = response.admin;
      loggedinUser.token = response.token;
      console.log(loggedinUser);
      this.authservice.loginUserLocalStorage(loggedinUser);
      this.router.navigate(['/home']);
    },
      error => {
        this.errorMessage = error.error;
      });
  }
}
