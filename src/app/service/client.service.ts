import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../model/client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  url = environment.baseUrl+"/api/client";

  constructor(private httpClient: HttpClient) { }

  fetchClients(): Observable<Client[]>{
    return this.httpClient.get<Client[]>(`${this.url}/all`);
  }

  getClient(clientId: number): Observable<Client>{
    return this.httpClient.get<Client>(`${this.url}/${clientId}`);
  }

  saveClient(client: Client):Observable<Client>{
    let newClient = new Client();
    newClient.firstName = client.firstName;
    newClient.lastName = client.lastName;
    newClient.email = client.email;
    newClient.phone = client.phone;
    newClient.address = client.address;
    return this.httpClient.post<Client>(`${this.url}/save`, newClient);
  }

  updateClient(client: Client):Observable<Client>{
    return this.httpClient.post<Client>(`${this.url}/save`, client);
  } 

  deleteClient(client:Client):Observable<any>{
   return this.httpClient.delete<any>(`${this.url}/delete/${client.id}`);
  }
  
}
