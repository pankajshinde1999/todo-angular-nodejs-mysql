import { Component, Inject } from '@angular/core';
import { TasksService } from '../tasks.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent {
  categories: any = []
  categoriesFrom: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private formBuilder: FormBuilder, private tservice: TasksService,
  private router: Router) {
    this.categories = data['value']
    console.log('categories', this.categories)
    this.inilizac()
}
inilizac() {
  this.categoriesFrom = this.formBuilder.group({
    title: ['', Validators.required],
    description: ['', Validators.required]
  });
}ngOnInit(): void{
    this.categoriesFrom.patchValue({
      title: this.categories.title,
      description: this.categories.description
    })
  }
onSubmit() {
    let body = this.categoriesFrom.getRawValue()
    this.tservice.UpdateTasks(body,this.categories.id).subscribe(
      (data: any) => {
        // this.router.navigate(['/home/products'])
        console.log(data)
      })
  }
}
