import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { D03Component } from './d03/d03.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: D03Component,
  },
];

@NgModule({
  declarations: [
    D03Component,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
})
export class D03Module { }
