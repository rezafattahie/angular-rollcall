import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { ApiService } from 'src/app/shared/services/api.service';
import { ITeachers } from 'src/app/features/models/teachers.interface';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  users: ITeachers[] = [];
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
        rosolve(this.isLoggedIn)
      }, 1000);
    })
  }

  checkAuth() {
    return this.isLoggedIn;
  }

  login(formInfo: NgForm) {
    this.api.get('teachers').subscribe((result: any) => {
      this.users = result;
      // this.users.forEach((user): any => {
      //           if (formInfo.value.username === user.username &&
      //     formInfo.value.password === user.password) {
      //     this.isLoggedIn = true;
      //     this.router.navigate(['']);
      //   } else {
      //     this.isLoggedIn = false;
      //   }
      // })

      const foundUser = this.users.find(user => {
        return formInfo.value.username === user.username && formInfo.value.password === user.password;
      })
      if (foundUser) {
        this.isLoggedIn = true;
        this.router.navigate(['']);
        this.toast.success(foundUser.name + ' loged in successfully!');
      }
      else {
        this.isLoggedIn = false;
        this.toast.error('user name or password is wrong!');
      }
      // if (this.isLoggedIn) {
      //   this.toast.success('loged in');
      // } else {
      //   this.toast.error('user name or password is wrong!');
      // }
      console.log('%clogin.component.ts line:27 this.isLoggedIn', 'color: white; background-color: #007acc;', this.isLoggedIn);
    });

  }

  logout() {
    this.isLoggedIn = false;
  }

}
