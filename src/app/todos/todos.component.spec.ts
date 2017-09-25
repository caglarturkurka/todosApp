import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosComponent } from './todos.component';
import {TodoComponent} from "../todo/todo.component";
import {HttpModule} from '@angular/http';
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BrowserModule} from '@angular/platform-browser';
import {TodosService} from "./todos.service";
import {LoginService} from "../login/login.service";
import {MakeDroppable} from "../shared/make-droppable.directive";
import {MakeDraggable} from "../shared/make-draggable.directive";
import {AppRoutingModule} from "../app-routing.module";
import {AppModule} from "../app.module";

describe('TodosComponent', () => {
  let component: TodosComponent;
  let fixture: ComponentFixture<TodosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
