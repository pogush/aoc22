import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { D02Component } from './d02/d02.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: D02Component,
  },
];

@NgModule({
  declarations: [
    D02Component,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class D02Module { }
