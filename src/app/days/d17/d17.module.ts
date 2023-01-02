import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { D17Component } from './d17/d17.component';
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: '',
    component: D17Component,
  },
];

@NgModule({
  declarations: [
    D17Component,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
})
export class D17Module { }
