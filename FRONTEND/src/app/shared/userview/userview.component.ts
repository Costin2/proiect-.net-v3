import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LoggedUser} from "../../DTOs/LoggedUser";
import {DomSanitizer} from "@angular/platform-browser";
import {FileuploadService} from "../../core/services/fileupload.service";
import {UserService} from "../../core/services/user.service";
import {LocalstorageService} from "../../core/services/localstorage.service";
import {AuthService} from "../../core/services/auth.service";
import {Router, RouterModule} from "@angular/router";

@Component({
  selector: 'app-userview',
  templateUrl: './userview.component.html',
  styleUrls: ['./userview.component.scss']
})
export class UserviewComponent implements OnInit{
  @Input() potschimbapoza: boolean = false;
  @Input() user: LoggedUser = new LoggedUser();
  @Output() utilizatorApasat = new EventEmitter<string>();
  public imagine:any = null;

  constructor(private sanitizer:DomSanitizer, private fileservice:FileuploadService, private userservice:UserService, private _localstorage:LocalstorageService, private authservice:AuthService, private router:Router){
  }

  image(url:string) {
    return this.imagine;
  }

  sanitize(url:string){
    this.fileservice.getPhoto(url).subscribe(response => {
      console.log(response);
      return response;
    });
    // return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  schimbaImaginea() {
    var elem = document.getElementById("schimbapoza");
    if (elem) {
      elem.style.display = "block";
    }
  }

  onFileSelected(event: Event) {
    var htmlinput = (event.target as HTMLInputElement).files;
    if (htmlinput == null) {
      return;
    } else {
      let img = htmlinput[0];
      this.fileservice.uploadFile(img).subscribe(response =>
      {
        let newImgId = response;
        ////update user si seteaza this.imagine pe null, update localstorage si refresh
        var usr = this._localstorage.getItem('user');
        if (usr != null) {
         var usrLogged:LoggedUser = JSON.parse(usr);
          this.userservice.getUserIdByUsername(usrLogged.username).subscribe(response=>{
            let user_id = response;
            console.log(user_id, newImgId);
            this.userservice.changeprofilepicture(user_id, newImgId).subscribe(response=> {
              var loggedinUser:LoggedUser = new LoggedUser();

              loggedinUser = usrLogged;
              loggedinUser.picture = atob(response);
              this.authservice.loginUserLocalStorage(loggedinUser);
               location.reload();

            },
              error => {
              console.log(error.error)
              });
          });
        }
      });
    }
  }

  ngOnInit(): void {
    this.fileservice.getPhoto(this.user.picture).subscribe(response => {
      this.imagine = 'data:image/jpeg;base64,' + response.fileContents;
    });
  }

  userApasat() {
    this.utilizatorApasat.emit(this.user.username);
  }
}
