import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { D01Component } from './d01/d01.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: D01Component,
  },
];

@NgModule({
  declarations: [
    D01Component,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
})
export class D01Module { }
