import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: any;
  constructor(private formBuilder: FormBuilder, private tservice: TasksService,
    private router: Router) { this.iniliza() }
  iniliza() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    let body = this.registerForm.getRawValue()
    console.log(body)
    this.tservice.AddUser(body).subscribe(
      (res: any) => {
        console.log(res)
        // localStorage.setItem('user', res.user)
        this.router.navigate(['/login'])
        //localStorage.setItem('user', JSON.stringify(res.data.user))
      })
  }

}
