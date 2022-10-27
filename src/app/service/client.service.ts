import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../model/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  baseUrl = "http://localhost:8080/api/client"

  constructor(private httpClient: HttpClient) { }

  fetchClients(): Observable<Client[]>{
    return this.httpClient.get<Client[]>(`${this.baseUrl}/all`);
  }

  getClient(clientId: number): Observable<Client>{
    return this.httpClient.get<Client>(`${this.baseUrl}/${clientId}`);
  }

  saveClient(client: Client):Observable<Client>{
    let newClient = new Client();
    newClient.firstName = client.firstName;
    newClient.lastName = client.lastName;
    newClient.email = client.email;
    newClient.phone = client.phone;
    newClient.address = client.address;
    return this.httpClient.post<Client>(`${this.baseUrl}/save`, newClient);
  }

  updateClient(client: Client):Observable<Client>{
    return this.httpClient.post<Client>(`${this.baseUrl}/save`, client);
  } 

  deleteClient(client:Client):Observable<any>{
   return this.httpClient.delete<any>(`${this.baseUrl}/delete/${client.id}`);
  }
  
}
