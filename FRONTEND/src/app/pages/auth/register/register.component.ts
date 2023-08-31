import { Component, OnInit } from '@angular/core';
import { UserRegister } from "../../../DTOs/UserRegister";
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from "../../../core/services/auth.service";
import { Router } from "@angular/router";
import { FileuploadService } from "../../../core/services/fileupload.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm = this.formBuilder.group({
    userName: ['', Validators.required],
    email: ['', Validators.compose([Validators.email, Validators.required])],
    password: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
  });

  public imagine: any = null;
  public hide: Boolean = true;
  errorMessage: any = null;

  private user: UserRegister = new UserRegister();

  constructor(private readonly formBuilder: FormBuilder, private readonly authservice: AuthService, private router: Router, private fileservice: FileuploadService) {

  }

  onSubmit() { }


  getFormValidationError(keys: any) {
    let ok = 0;
    keys.forEach((key: any) => {
      const controlErrors = this.registerForm.get(key)?.errors;
      if (controlErrors != null) {
        console.error(key + ' has errors: ' + controlErrors);
        ok = 1;
      }
    })
    return ok;
  }
  checkForm() {
    let amerori = this.getFormValidationError(['userName', 'email', 'password', 'firstName', 'lastName']);
    this.user.username = this.registerForm.get('userName')?.value;
    this.user.firstName = this.registerForm.get('firstName')?.value;
    this.user.lastName = this.registerForm.get('lastName')?.value;
    this.user.username = this.registerForm.get('userName')?.value;
    this.user.email = this.registerForm.get('email')?.value;
    this.user.password = this.registerForm.get('password')?.value;

    if (this.imagine == null) {
      console.log("nu ai incarcat nici o imagine");
    } else {
      let img: File = this.imagine;
      console.log(img.name, img.size, img.type);
      if (img.type != "image/jpeg") {
        this.errorMessage = "Formatul fisierului nu este bun!";
        return;
      }
    }
    this.errorMessage = null;
    console.log("trecut");
    if (amerori) {
      return;
    }
    if (this.imagine == null) {
      console.log("nu ai incarcat nici o imagine");
    } else {
      let img: File = this.imagine;
      console.log(img.name, img.size, img.type);
      this.fileservice.uploadFile(img).subscribe(
        response => {
          this.errorMessage = null;
          console.log("s a pus poza");
          console.log(response);
          this.user.picture = response;
          console.log("asta e poza");
          console.log(response);
          console.log(this.user);
          this.authservice.registerUser(this.user).subscribe(response => {
            this.errorMessage = null;
            this.router.navigate(['/home']);
          }, error => { console.log(error.error); this.errorMessage = error.error; });
        },
        error => {
          console.log(error.error);
        }
      );
    }
  }

  ngOnInit(): void {
  }


  onFileSelected(event: Event) {
    var htmlinput = (event.target as HTMLInputElement).files;
    if (htmlinput == null) {
      this.imagine = null;
      return;
    } else {
      this.imagine = htmlinput[0];
    }

  }
}
