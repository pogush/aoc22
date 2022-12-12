import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { D12Component } from './d12/d12.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: D12Component,
  },
];

@NgModule({
  declarations: [
    D12Component,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
})
export class D12Module { }
