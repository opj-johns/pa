import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductPhotoService {

  url = environment.baseUrl+"/api/image/fileSystem";

  constructor(private httpClient: HttpClient) { }

  saveImage(formData: FormData): Observable<String>{
    return this.httpClient.post<String>(`${this.url}`, formData );
  }
}
