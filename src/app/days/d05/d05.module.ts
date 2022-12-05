import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { D05Component } from './d05/d05.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: D05Component,
  },
];

@NgModule({
  declarations: [
    D05Component,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
})
export class D05Module { }
