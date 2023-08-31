import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { MessageDTO } from "../../DTOs/MessageDTO";
import { Observable, Subject } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private connection: any = new signalR.HubConnectionBuilder().withUrl("https://localhost:7243/chatHub").configureLogging(signalR.LogLevel.Information).build();

  readonly POST_URL = "https://localhost:7243/api/Chat/send"
  readonly GETGR_URL = "https://localhost:7243/api/Chat/getGroup"

  private receivedMessageObject: MessageDTO = new MessageDTO();
  private sharedObj = new Subject<MessageDTO>();


  constructor(private http: HttpClient) {
    this.connection.onclose(async () => {
      await this.start();
    });
    this.connection.on("ReceiveOne", (user: any, message: any) => {
      this.mapReceivedMessage(user, message);
    });
    this.start();
  }

  public async start() {
    try {
      await this.connection.start();
      console.log("connected");
    } catch (err) {
      console.log(err);
      setTimeout(() => this.start(), 5000);
    }
  }

  private mapReceivedMessage(user: string, message: string): void {
    this.receivedMessageObject.user = user;
    this.receivedMessageObject.msgText = message;
    this.sharedObj.next(this.receivedMessageObject);
  }

  public broadcastMessage(msgDto: any, room: string, join: boolean) {
    msgDto.room = room;
    msgDto.join = join;
    msgDto.connectionid = this.connection.connection.connectionId;
    console.log(this.connection.connection.connectionId);
    this.http.post(this.POST_URL, msgDto).subscribe(data => console.log(data));
  }

  public retrieveMappedObject(): Observable<any> {
    console.log("primit");
    return this.sharedObj;
  }

  public getGroup(user1: string, user2: string) {
    var header: HttpHeaders = new HttpHeaders(
      {
        'usr1': user1,
        'usr2': user2
      }
    );
    var headers = {
      headers: header
    }
    return this.http.get(this.GETGR_URL, headers);
  }

  public getAllByGroup(group: string, user: string) {
    var header: HttpHeaders = new HttpHeaders(
      {
        'group': group,
        'user': user
      }
    );
    var headers = {
      headers: header
    }
    return this.http.get("https://localhost:7243/api/Chat/flushMessages", headers);
  }

  public CheckUnread(group: string, user: string) {
    var header: HttpHeaders = new HttpHeaders(
      {
        'group': group,
        'user': user
      }
    );
    var headers = {
      headers: header
    }
    return this.http.get("https://localhost:7243/api/Chat/checkunread", headers);
  }
}
