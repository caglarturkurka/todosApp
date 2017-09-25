
import {Injectable} from "@angular/core";
import {Http, RequestOptions, URLSearchParams} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {API_URL} from "../app.constants";
import {Todos} from "./todos.model";

@Injectable()
export class TodosService{

  constructor(private http: Http){

  }


  getTodos(): Observable<any>{
    let sessionId = window.localStorage.getItem("sessionId");
    return this.http.get(API_URL +"/todos?sessionId="+sessionId);
  }

  addTodo(todo: Todos): Observable<any>{
    let sessionId = window.localStorage.getItem("sessionId");
    return this.http.put(API_URL +"/todo?sessionId="+sessionId,todo);
  }

  deleteTodo(id: string): Observable<any>{
    let sessionId = window.localStorage.getItem("sessionId");
    return this.http.delete(API_URL +"/todo?sessionId="+sessionId,new RequestOptions({
      body: {"id":id}
    }));
  }

  updateTodo(todo: Todos): Observable<any>{
    let sessionId = window.localStorage.getItem("sessionId");
    let obj: any = {"id":todo._id,"title":todo.title,"description":todo.description,"status":todo.status}
    return this.http.put(API_URL +"/todo?sessionId="+sessionId,obj);
  }


}
