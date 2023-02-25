import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isAuthenticated: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private toaster: ToastrService
  ) { }
  ngOnInit() {
    this.isAuthenticated = this.authService.checkAuth();
  }

  onSubmit(form: NgForm) {
    console.log('%clogin.component.ts line:15 form', 'color: white; background-color: #26bfa5;', form);
    if (form.value.password == 123 && form.value.username === "reza") {
      this.authService.login();
      this.router.navigate(['']);
      this.toaster.success(form.value.username + " logged in successfully!")
    } else {
      this.authService.logout();
      this.toaster.error("User name or password is wrong.", "Login failed")
    }
  }

}
