import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private router: Router) { }
  ngOnInit() { }

  onSubmit(form: NgForm) {
    console.log('%clogin.component.ts line:15 form', 'color: white; background-color: #26bfa5;', form);
    (form.value.password == 123 && form.value.username === "reza")
      ? this.router.navigate(['/home'])
      : console.log("username or password is wrong")
  }

}
