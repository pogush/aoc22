import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { D07Component } from './d07/d07.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: D07Component,
  },
];

@NgModule({
  declarations: [
    D07Component,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
})
export class D07Module { }
