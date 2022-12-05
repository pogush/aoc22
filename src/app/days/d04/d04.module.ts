import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { D04Component } from './d04/d04.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: D04Component,
  },
];

@NgModule({
  declarations: [
    D04Component,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class D04Module { }
