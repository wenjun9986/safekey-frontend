import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import {AuthService} from "../services/auth.service";


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    const JWTToken = await this.authService.getToken();

    if (!JWTToken){
        await this.router.navigate(['/login']);
        return false;
    }

    const isValid = await this.authService.isTokenValid(JWTToken);
    if (!isValid){
        await this.router.navigate(['/login']);
        return false;
    }
    return true;
  }
}

