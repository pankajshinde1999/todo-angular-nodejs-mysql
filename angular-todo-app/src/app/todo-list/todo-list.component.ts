import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TasksService } from '../tasks.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdateComponent } from '../update/update.component';
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  @Input() formData: any;
  tasks: any = [];
  constructor(private http: HttpClient , private tservice : TasksService,private cdRef: ChangeDetectorRef,private dialog: MatDialog) { 

  }
  ngOnChanges() {
    // Manually trigger change detection to update the view
    this.cdRef.detectChanges();
    this.getTasks();
  }

  ngOnInit() {
    this.getTasks();
  }
  getTasks() {
    this.tservice.getTasks().subscribe(
      data=>{
        this.tasks = data
        console.log (this.tasks)
      }
    )
  }
  DeleteTasks(id:any){
    console.log(id)
    this.tservice.DeleteTasks(id).subscribe(
      data =>
      {
        this.tasks=[]
        this.getTasks()
      }
    )
  }
  // updatep(data: any) {
  //   const dialogRef = this.dialog.open(UpdateComponent, {
  //     height: '80%', width: '80%',
  //     data: {
  //       value: data,
  //       title: 'Product'
  //     }
  //   })
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('Dialog was closed');
  //     console.log('Returned value:', result);
  //     this.getProducts()
  //     // Perform actions with the returned value
  //   });;
  // }
  UpdateTasks(data:any){
    const dialogRef = this.dialog.open(UpdateComponent, {
          height: '80%', width: '80%',
          data: {
            value: data,
            title: 'task'
          }
        })
        dialogRef.afterClosed().subscribe(result => {
          console.log('Dialog was closed');
          console.log('Returned value:', result);
          this.getTasks()
        });;

  }

}
