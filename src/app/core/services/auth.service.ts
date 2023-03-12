import { Injectable } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { ApiService } from 'src/app/shared/services/api.service';
import { ITeachers } from 'src/app/features/models/teachers.interface';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  users: ITeachers[] = [];
  foundUser?: ITeachers = { code: '', courses: [], imageUrl: '', name: '', password: '', username: '' };
  isLoggedIn: boolean = false;
  toaster: any;

  constructor(
    private router: Router,
    private api: ApiService,
    private toast: ToastrService
  ) { }

  isAuthenticated() {
    return new Promise((rosolve, reject) => {
      // TIMER DEFINED JUST FOR SIMULATION OF REAL RECIEVE DATA FROM BACK-END
      setTimeout(() => {
        rosolve(localStorage.getItem("User"))
      }, 500);
    })
  }

  checkAuth() {
    return this.isLoggedIn;
  }

  login(formInfo: FormGroup) {
    this.api.get('teachers').subscribe((result: any) => {
      this.users = result;
      this.foundUser = this.users.find(user => {
        return formInfo.value.username === user.username && formInfo.value.password === user.password;
      })
      if (this.foundUser) {
        this.isLoggedIn = true;
        localStorage.setItem("User", JSON.stringify({ code: this.foundUser.code, name: this.foundUser.name }));
        this.router.navigate(['']);
        this.toast.success(this.foundUser.name + ' loged in successfully!');
      }
      else {
        this.isLoggedIn = false;
        this.toast.error('user name or password is wrong!');
      }
    });
  }

  logout() {
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
    localStorage.removeItem("User");
  }

}
