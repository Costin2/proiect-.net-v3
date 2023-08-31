import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LoggedUser } from "../../../DTOs/LoggedUser";
import { DomSanitizer } from "@angular/platform-browser";
import { FileuploadService } from "../../../core/services/fileupload.service";
import { UserService } from "../../../core/services/user.service";
import { LocalstorageService } from "../../../core/services/localstorage.service";
import { AuthService } from "../../../core/services/auth.service";
import { Router } from "@angular/router";
import { ChatService } from "../../../core/services/chat.service";

@Component({
  selector: 'app-showuser',
  templateUrl: './showuser.component.html',
  styleUrls: ['./showuser.component.scss']
})
export class ShowuserComponent implements OnInit {
  @Input() potschimbapoza: boolean = false;
  @Input() user: LoggedUser = new LoggedUser();
  @Output() utilizatorApasat = new EventEmitter<string>();
  public hasmessages: boolean = false;
  public imagine: any = null;

  constructor(private sanitizer: DomSanitizer, private fileservice: FileuploadService, private userservice: UserService, private _localstorage: LocalstorageService, private authservice: AuthService, private router: Router, private chatService: ChatService) {
  }

  image(url: string) {
    return this.imagine;
  }

  ngOnInit(): void {
    this.fileservice.getPhoto(this.user.picture).subscribe(response => {
      this.imagine = 'data:image/jpeg;base64,' + response.fileContents;
    });

    var loggedUser = this.authservice.getLoggedUser().username;
    this.userservice.getUserIdByUsername(loggedUser).subscribe(r => {
      this.chatService.getGroup(loggedUser, this.user.username).subscribe(
        res => {
          this.chatService.CheckUnread(res.toString(), r).subscribe(result => {
            console.log(result);
            this.hasmessages = (result.toString() != 'false');
          });
        }
      );
    });
  }

  userApasat() {
    this.utilizatorApasat.emit(this.user.username);
  }
}
