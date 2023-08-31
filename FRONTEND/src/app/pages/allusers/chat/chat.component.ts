import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ChatService } from "../../../core/services/chat.service";
import { MessageDTO } from "../../../DTOs/MessageDTO";
import { AuthService } from "../../../core/services/auth.service";
import { ActivatedRoute } from "@angular/router";
import { Parser } from "@angular/compiler";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  public user1: string = "";
  public user2: any = "";
  public group: any = "";

  public msgDto: MessageDTO = new MessageDTO();
  public msgInboxArray: MessageDTO[] = [];

  constructor(private chatService: ChatService, private authservice: AuthService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.user2 = this.route.snapshot.paramMap.get('username');
    this.user1 = this.authservice.getLoggedUser().username;
    if (this.group == "") {
      console.log("aici");
      this.chatService.getGroup(this.user1, this.user2).subscribe(res => {
        this.group = res;
        this.chatService.broadcastMessage(this.msgDto, this.group, true);

        this.chatService.getAllByGroup(this.group, this.user1).subscribe(result => {
          var aux = JSON.parse(JSON.stringify(result));
          console.log("Poti vorbi")
          aux.forEach((elem: any) => {
            //console.log(elem.message, elem.user.username);
            var msg = new MessageDTO()
            msg.msgText = elem.message;
            msg.user = elem.user.username
            this.addToInbox(msg);
          })
        });

      },
        error => {
          console.log(error);
        }
      );
    }
    this.chatService.retrieveMappedObject().subscribe((receivedObj: MessageDTO) => {
      console.log(receivedObj);
      this.addToInbox(receivedObj);
    },
      error => {
        console.log("error");
      });
  }

  send(): void {
    this.msgDto.user = this.user1;
    if (this.msgDto) {
      if (this.msgDto.user.length == 0 || this.msgDto.user.length == 0) {
        window.alert("Both fields are required.");
        return;
      } else {
        this.chatService.broadcastMessage(this.msgDto, this.group, false);                   // Send the message via a service
      }
    }
  }

  addToInbox(obj: MessageDTO) {
    let newObj = new MessageDTO();
    newObj.user = obj.user;
    if (this.user1 != obj.user) {
      console.log(obj.msgText);
    }
    newObj.msgText = obj.msgText;
    this.msgInboxArray.push(newObj);

  }

  ngOnDestroy(): void {
    console.log("ok");
  }

}
