import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { D14Component } from './d14/d14.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: D14Component,
  },
];

@NgModule({
  declarations: [
    D14Component,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
})
export class D14Module { }
