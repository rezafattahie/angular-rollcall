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
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private toast: ToastrService
  ) { }

  ngOnInit() {
    // this.isAuthenticated = this.authService.checkAuth();
  }

  onSubmit(form: NgForm) {
    this.authService.login(form);
  }

}
