import { Component } from '@angular/core';
import { TasksService } from '../tasks.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: any;
  constructor(private formBuilder: FormBuilder, private tservice: TasksService,
    private router: Router) { this.iniliza() }
  iniliza() {

    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    let body = this.loginForm.getRawValue()
    console.log(body)
    this.tservice.LoginUser(body).subscribe(
      (res: any) => {
        console.log(res)
        localStorage.setItem('id', res.user[0].id)
        localStorage.setItem('name', res.user[0].name)


        this.router.navigate(['/home'])
        //localStorage.setItem('user', JSON.stringify(res.data.user))
      })
  }
}
