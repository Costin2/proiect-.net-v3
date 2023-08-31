import { Component } from '@angular/core';
import { LoggedUser } from "./DTOs/LoggedUser";
import { AuthService } from "./core/services/auth.service";
import { LocalstorageService } from "./core/services/localstorage.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';

  constructor(private readonly authservice: AuthService, private readonly _localstorage: LocalstorageService) {
  }

  isLogged() {
    return this.authservice.isLoggedIn();
  }

  isAdmin() {
    return this.authservice.isAdmin();
  }

  getloggeduser() {
    var rez = this._localstorage.getItem('user');
    if (rez == null) {
      return null;
    }
    return JSON.parse(rez);
  }
}
