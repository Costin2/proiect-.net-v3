import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Form } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private readonly httpClient: HttpClient) { }

  get<T>(path: string, params = {}): Observable<any> {
    return this.httpClient.get<T>(`${this.apiUrl}${path}`, params);
  }

  put<T>(path: string, body = {}): Observable<any> {
    return this.httpClient.put<T>(`${this.apiUrl}${path}`, body);
  }

  post_formData<T>(path: string, form: FormData): Observable<any> {
    const headers = new HttpHeaders({ 'enctype': 'multipart/form-data' });
    return this.httpClient.post<T>(`${this.apiUrl}${path}`, form, { headers: headers });
  }


  post<T>(path: string, body = {}): Observable<any> {
    console.log(body);
    return this.httpClient.post<T>(`${this.apiUrl}${path}`, body);
  }

  delete<T>(path: string, headers = {} = {}): Observable<any> {
    return this.httpClient.delete<T>(`${this.apiUrl}${path}`, { headers: headers });
  }



  patch<T>(path: String, patchDoc = {}, options = {}): Observable<any> {
    return this.httpClient.patch<T>(`${this.apiUrl}${path}`, patchDoc, options);
  }
}
