import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginRequest } from '../model/login-request';
import { User } from '../model/user';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
  })
export class AuthService{
    

    baseUrl = environment.baseUrl;

    constructor(private http: HttpClient){}

    getAuthorizationToken(): string{
        const accessToken = localStorage.getItem('accessToken');
        const tokenType= localStorage.getItem('tokenType');
        let auth_token = `${tokenType} ${accessToken}`;
        if(auth_token != null) return auth_token;
        return `token not available`;
    }

    authenticateUser(loginRequest: LoginRequest):Observable<User>{
        return this.http
        .post<User>(`${this.baseUrl}/api/auth/signin`, loginRequest);
    }

    rememberUser(user:User){
        localStorage.setItem('id',`${user.id}`);
        localStorage.setItem('username',`${user.username}`);
        localStorage.setItem('email',`${user.email}`);
        localStorage.setItem('roles',`${user.roles}`);
        localStorage.setItem('accessToken',`${user.accessToken }`);
        localStorage.setItem('tokenType',`${user.tokenType }`);
    }

    signoutUser() {
        localStorage.removeItem('id');
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        localStorage.removeItem('roles');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('tokenType');
     }
}  