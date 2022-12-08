import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { D08Component } from './d08/d08.component';
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {
    path: '',
    component: D08Component,
  },
];

@NgModule({
  declarations: [
    D08Component,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
})
export class D08Module { }
