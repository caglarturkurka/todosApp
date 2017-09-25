import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import { LoginComponent } from './login/login.component';
import {AppRoutingModule} from './app-routing.module';
import { TodosComponent } from './todos/todos.component';
import {LoginService} from "./login/login.service";
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import {TodosService} from "./todos/todos.service";
import {MakeDraggable} from "./shared/make-draggable.directive";
import {MakeDroppable} from "./shared/make-droppable.directive";
import {TodoComponent} from "./todo/todo.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TodosComponent,
    MakeDraggable,
    MakeDroppable,
    TodoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    AppRoutingModule

  ],
  providers: [
    LoginService,
    TodosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
