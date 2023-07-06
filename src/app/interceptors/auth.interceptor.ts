import { HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { environment } from 'src/environments/environment';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  baseUrl:string = environment.baseUrl;
  constructor(private auth: AuthService) {}
  
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    
    const EXCEPTIONURL= `${this.baseUrl}/api/auth/signin`;

    if(req.url !== EXCEPTIONURL){

      // Get the auth token from the service.
      const authToken = this.auth.getAuthorizationToken();
  
      // Clone the request and replace the original headers with
      // cloned headers, updated with the authorization.
      const authReq = req.clone({
        headers: req.headers.set('Authorization', authToken)
      });
  
      // send cloned request with header to the next handler.
      return next.handle(authReq);
    }
    return next.handle(req);
  }
}