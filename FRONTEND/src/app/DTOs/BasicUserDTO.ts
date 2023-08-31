export class BasicUserDTO {
  public id: any = "";
  public username: any = "";
  public picture: any = "";
  public firstName:any = "";
  public lastName:any = "";

  constructor(id:string, username:string, picture:String, firstname:String, lastname:String) {
    this.id = id;
    this.username = username;
    this.picture = picture;
    this.firstName = firstname;
    this.lastName = lastname;
  }
}
