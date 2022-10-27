import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductPhotoService {

  baseUrl = "http://localhost:8080/api/image/fileSystem"

  constructor(private httpClient: HttpClient) { }

  saveImage(formData: FormData): Observable<String>{
    return this.httpClient.post<String>(`${this.baseUrl}`, formData);
  }
}
