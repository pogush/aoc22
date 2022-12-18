import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { D15Component } from './d15/d15.component';
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {
    path: '',
    component: D15Component,
  },
];

@NgModule({
  declarations: [
    D15Component
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class D15Module { }
