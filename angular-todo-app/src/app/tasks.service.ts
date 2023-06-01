import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TasksService {
  constructor(private http: HttpClient) { }
  baseUrl = 'http://localhost:3000'
  //gettasks
  getTasks(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getalltasks`)
  }
  //crete
  createTasks(body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/createtasks`, body)
  }
  //delete
  DeleteTasks(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deletetasks/${id}`)
  }
  //update
  UpdateTasks(body: any,id:any): Observable<any> {
    return this.http.put(`${this.baseUrl}/updatetasks/${id}`,body)
  }
}
