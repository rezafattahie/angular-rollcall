import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'

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
  ) { }

  ngOnInit() {

  }

  onSubmit(form: NgForm) {
    this.authService.login(form);
  }

}
