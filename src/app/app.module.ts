import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { TodoListComponent } from './todo/todo-list.component';
import { TodoItemComponent } from './todo/todo-item.component';
import { TodoInputComponent } from './todo/todo-input.component';
import { TodoStore } from './shared/todoStore.service';
import { WriteOutJsonInterceptor } from './shared/write-out-json-interceptor';
import { AddOnEnterDirective } from './shared/add-on-enter.directive';
import { AppRoutingModule } from './app-routing.module';
import { ApiServiceProvider } from './api.service.provider';
import { WebStorageModule } from 'ngx-store';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoItemComponent,
    TodoInputComponent,
    AddOnEnterDirective,
    AddOnEnterDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    ButtonsModule.forRoot(),
    AppRoutingModule,
    WebStorageModule
  ],
  providers: [
    TodoStore,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: WriteOutJsonInterceptor,
      multi: true
    },
    ApiServiceProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
