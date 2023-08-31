import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ApiService } from "./api.service";
import { Params } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class FileuploadService {

  private readonly route = 'FileUpload';
  @Output() public onUploadFinished = new EventEmitter();

  constructor(private readonly apiService: ApiService) { }

  uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    return this.apiService.post_formData(this.route + '/uploadfile?location=false', formData);
  }

  getPhoto(path: string) {

    const queyParams: URLSearchParams = new URLSearchParams();
    queyParams.set('path', path);
    return this.apiService.get(this.route + '/getimage?path=' + path);
  }
}
