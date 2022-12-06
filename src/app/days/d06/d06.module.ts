import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { D06Component } from './d06/d06.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: D06Component,
  },
];

@NgModule({
  declarations: [
    D06Component,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class D06Module { }
