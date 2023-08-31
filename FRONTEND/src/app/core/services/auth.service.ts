import { Injectable } from '@angular/core';
import { FormBuilder } from "@angular/forms";
import { ApiService } from "./api.service";
import { UserRegister } from "../../DTOs/UserRegister";
import { UserLogin } from "../../DTOs/UserLogin";
import { LocalstorageService } from "./localstorage.service";
import { LoggedUser } from "../../DTOs/LoggedUser";
import { HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly route = 'User';

  constructor(private readonly apiService: ApiService, private readonly _localstorage: LocalstorageService) {

  }

  registerUser(user: UserRegister) {
    return this.apiService.post(this.route + '/create-user', { "userName": user.username, "password": user.password, "email": user.email, "firstName": user.firstName, "lastName": user.lastName, "PictureID": user.picture });
  }

  loginUser(user: UserLogin) {
    return this.apiService.post(this.route + '/authenticate', { "userName": user.username, "password": user.password });
  }

  isLoggedIn() {
    let rez = this._localstorage.getItem("user");
    if (rez == null) {
      return false;
    }
    return true;
  }

  isAdmin() {
    let rez = this._localstorage.getItem("user");
    if (rez == null) {
      return false;
    }
    let user: LoggedUser = JSON.parse(rez);
    return user.admin;
  }

  loginUserLocalStorage(user: LoggedUser) {
    this._localstorage.setItem("user", user);
    this.isAdmin();
  }

  getLoggedUser() {
    var rez = this._localstorage.getItem('user');
    if (rez != null) {
      return JSON.parse(rez);
    }
    return null;
  }

  logOut() {
    this._localstorage.removeItem("user");
  }

  getToken() {
    var user = this.getLoggedUser();
    if (user == null) {
      return false;
    } else {
      return user.token;
    }
  }

  getId() {
    var user = this.getLoggedUser();
    if (user == null) {
      return false;
    } else {
      return user.username;
    }
  }

}
