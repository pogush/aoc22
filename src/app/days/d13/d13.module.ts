import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { D13Component } from './d13/d13.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: D13Component,
  },
];

@NgModule({
  declarations: [
    D13Component,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
})
export class D13Module { }
