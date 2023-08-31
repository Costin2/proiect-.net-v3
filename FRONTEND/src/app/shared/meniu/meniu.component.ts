import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { AuthService } from "../../core/services/auth.service";

@Component({
  selector: 'app-meniu',
  templateUrl: './meniu.component.html',
  styleUrls: ['./meniu.component.scss']
})
export class MeniuComponent implements OnInit {
  @Input() isLogged: boolean = false;
  @Input() isAdmin: boolean = false;

  constructor(private router: Router, private readonly authservice: AuthService) {
  }

  onSubmit() {
    this.router.navigate(['/auth/login']);
  }

  signup() {
    this.router.navigate(['/auth/register']);
  }

  ngOnInit(): void {

  }

  goHome() {
    this.router.navigate(['/home']);
  }

  goPosts() {

  }

  logout() {
    this.authservice.logOut();
    this.router.navigate(['/home']);
  }

  gotoAdmin() {
    this.router.navigate(['/admin/dashboard']);
  }

  goUsers() {
    this.router.navigate(['/allusers/users']);
  }
}
