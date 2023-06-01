import { Component,EventEmitter,Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  @Output() formSubmitted = new EventEmitter<any>();
  noteform: any;
  constructor(private formBuilder: FormBuilder,private tservice: TasksService) {
    this.initialization()
  }
  initialization() {
    this.noteform = this.formBuilder.group({
      title: ['', Validators.required],
      Description: ['', Validators.required],
    })
  }
  OnSubmit(){
    console.log(this.noteform.getRawValue())
    let body = this.noteform.getRawValue()
    this.tservice.createTasks(body).subscribe(
      (res:any)=>{
        console.log(res)
        this.noteform.reset()
        this.formSubmitted.emit(res);
      }
    )
  }


}
