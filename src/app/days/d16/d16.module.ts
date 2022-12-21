import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { D16Component } from './d16/d16.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: D16Component,
  },
];

@NgModule({
  declarations: [
    D16Component,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
})
export class D16Module { }
