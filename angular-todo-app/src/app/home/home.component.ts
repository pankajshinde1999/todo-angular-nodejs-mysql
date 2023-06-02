import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  submittedFormData: any;
  value: string | null;
  name: string | null;
  constructor(private router: Router) {
    this.value = localStorage.getItem("id")
    this.name = localStorage.getItem("name")
  }
  title = 'angular-todo-app';
  logout() {
    localStorage.removeItem('id');
    this.router.navigate(['/login'])
  }
  handleFormSubmission(formData: any) {
    console.log(formData)
    this.submittedFormData = formData;
  }
}
