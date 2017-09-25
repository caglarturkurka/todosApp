
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {TodosComponent} from "./todos/todos.component";

const  appRoute: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'todos', component: TodosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoute,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
