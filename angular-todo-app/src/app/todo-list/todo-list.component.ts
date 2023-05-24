import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  tasks: any[];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    this.http.get<any[]>('http://localhost:3000/api/tasks').subscribe(
      (response) => {
        this.tasks = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  createTask(description: string) {
    const task = { description };
    this.http.post<any>('http://localhost:3000/api/tasks', task).subscribe(
      (response) => {
        task.id = response.id;
        this.tasks.push(task);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateTask(task: any) {
    this.http
      .put<any>(`http://localhost:3000/api/tasks/${task.id}`, task)
      .subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  deleteTask(task: any) {
    this.http
      .delete<any>(`http://localhost:3000/api/tasks/${task.id}`)
      .subscribe(
        (response) => {
          const index = this.tasks.findIndex((t) => t.id === task.id);
          this.tasks.splice(index, 1);
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
