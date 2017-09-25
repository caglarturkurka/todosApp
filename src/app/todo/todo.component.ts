import {Component, OnInit, Input, Output, EventEmitter, OnDestroy} from '@angular/core';
import {Todos} from "../todos/todos.model";
import {TodosService} from "../todos/todos.service";
import {Subscription} from "rxjs/Subscription";


 @Component ({
  selector: 'todo',
  templateUrl: 'todo.component.html',
   styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit,OnDestroy {

  @Input() todo:Todos;
  @Output() deleteItem = new EventEmitter();


  private _subscription: Subscription;

  public isUpdating = false;

  constructor( public todosService: TodosService) {}

  ngOnInit() {
    this.todo = new Todos();
    this.isUpdating = false;
  }

  cancelUpdating(){
    this.isUpdating = false;
  }

  updateItem(todoItem: Todos){
    this._subscription = this.todosService.updateTodo(todoItem).subscribe(
      (response) => {
        this.cancelUpdating();
      },
      (error) => {

      },
      ()=> {

      }
    )
  }
   updating(){
     this.isUpdating = true;
   }

   delete(): void{
    this.deleteItem.emit(null);

   }

   ngOnDestroy(): void {
     if(this.subscription){
       this.subscription.unsubscribe();
     }
   }
   get subscription(): Subscription {
     return this._subscription;
   }
}
