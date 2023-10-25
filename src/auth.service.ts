import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { CanActivate,ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService   {
  
  constructor(public auth: ApiService, public router: Router) {}

  
  createImage(body:any) {
    return this.auth.request({
      path:`http://localhost:4000/map/add`,
      method:"POST",
      body
    }); 
  }
}