import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {TodosService} from "./todos.service";
import {Subscription} from "rxjs/Subscription";
import {LoginService} from "../login/login.service";
import {Todos} from "./todos.model";
import {Status} from "./status.enum";
import {animate, keyframes, query, stagger, style, transition, trigger} from "@angular/animations";


@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
  /*animations: [
    trigger("listAnimation",[

      transition("* => *",[
        query(":enter", style({ opacity: 0}),{optional: true}),
        query(":enter",stagger("300ms",[
          animate("1s ease-in", keyframes([
            style({opacity: 0, transform: "translateY(-75x)", offset: 0}),
            style({opacity: .5, transform: "translateY(35x)", offset: 0.3}),
            style({opacity: 1, transform: "translateY(0)", offset: 1})
          ]))
        ]),{optional: true}),


      ])

    ])
  ]*/
})
export class TodosComponent implements OnInit, OnDestroy {


  private subscription: Subscription;
  public todosInProgress: Todos[] = [];
  public todosCompleted: Todos[] = [];
  public isAdding = false;
  public todoTmp;
  public status = Status;
  public source: any;

  @Input()todo: Todos;
  constructor(private todosService: TodosService, private loginService: LoginService) { }



  ngOnInit() {
    this.getTodos();
    this.todoTmp = new Todos();
    this.isAdding = false;
    console.log(this.status.completed);
  }

  logout(): void{
    this.loginService.logout();
  }


  getTodos(){
    this.todosInProgress = [];
    this.todosCompleted = [];
    this.subscription = this.todosService.getTodos().subscribe(
      (response) =>{
         let todoList: Todos[] =<Array<Todos>> response.json().data;
         todoList.forEach( todoItem => {
           if(todoItem.status == "completed"){
             this.todosCompleted.push(todoItem);
           }else{
             this.todosInProgress.push(todoItem);
           }
         });
      },
      (error) => {

      },
      () =>{

      }
    )

  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

  showNewItem(){
    this.isAdding = true;
  }

  cancelAdding(){
    this.isAdding = false;
  }

  addNewItem(){
    this.todoTmp.status = this.status.notCompleted;
    this.subscription = this.todosService.addTodo(this.todoTmp).subscribe(
      (response) => {
          this.cancelAdding();
          this.getTodos();
      },
      (error) => {

      },
      () => {

      }
    )
  }



  deleteItem(id: string){
    this.subscription = this.todosService.deleteTodo(id).subscribe(
      (response) => {
        this.getTodos();
      },
      (error) => {


      },
      () => {

      }
    )

  }

  onDrop(src: Todos, trg: Todos) {
    this._moveRow(src, trg);
  }

  _moveRow(src, trg) {
    let srcTmp = <Todos>src;
    let trgTmp = <Todos>trg;
    if(srcTmp.status=="notCompleted" && trgTmp.status=="completed" ){
      srcTmp.status="completed";
      this.todosService.updateTodo(srcTmp).subscribe(
        (response) => {
          this.getTodos();
        }
      )
    }else if(srcTmp.status=="completed" && trgTmp.status=="notCompleted"){
      srcTmp.status="notCompleted";
      this.todosService.updateTodo(srcTmp).subscribe(
        (response) => {
          this.getTodos();
        }
      )
    }

  }

}
