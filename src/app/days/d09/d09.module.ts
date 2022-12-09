import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { D09Component } from './d09/d09.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: D09Component,
  },
];

@NgModule({
  declarations: [
    D09Component,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
})
export class D09Module { }
