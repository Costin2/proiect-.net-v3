import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { ApiService } from "./api.service";
//import * as Console from "console";
import { HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly route = 'User';
  private responseSource = new BehaviorSubject<object>({});
  public response = this.responseSource.asObservable();
  constructor(private readonly apiService: ApiService) { }

  getUserWithQueryParams(id = {}) {
    return this.apiService.get(this.route + '/user/', { id });
  }

  getAllUsersAdmin(token: string) {
    var header: HttpHeaders = new HttpHeaders(
      {
        'Authorization': token,
      }
    );
    var headers = {
      headers: header
    }
    console.log(header);
    return this.apiService.get(this.route + '/allusersadmin', headers);
  }

  changeprofilepicture(userID: any, newId: string) {
    return this.apiService.patch(this.route + '/changepicture/' + userID + '/' + newId);
  }

  getUserIdByUsername(username: any) {
    return this.apiService.get(this.route + '/userid?username=' + username);
  }

  deleteUser(id: string, token: string) {
    var header: HttpHeaders = new HttpHeaders(
      {
        'Authorization': token,
        'id': id
      }
    );
    return this.apiService.delete(this.route + '/deleteid', header);
  }

  MakeAdmin(id: string, token: string) {
    var header: HttpHeaders = new HttpHeaders(
      {
        'Authorization': token,
        'id': id
      }
    );
    return this.apiService.patch(this.route + '/makeAdmin', {}, { headers: header });
  }

  AllUsers() {
    return this.apiService.get(this.route + '/users')
  }

}
