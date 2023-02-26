import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn: boolean = false;

  constructor() { }

  isAuthenticated() {
    return new Promise((rosolve, reject) => {
      // TIMER DEFINED JUST FOR SIMULATION OF REAL RECIEVE DATA FROM BACK-END
      setTimeout(() => {
        rosolve(this.isLoggedIn)
      }, 1000);
    })
  }

  checkAuth() {
    return this.isLoggedIn;
  }

  login() {
    this.isLoggedIn = true;
  }

  logout() {
    this.isLoggedIn = false;
  }

}
