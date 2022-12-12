import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { D11Component } from './d11/d11.component';
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {
    path: '',
    component: D11Component,
  },
];

@NgModule({
  declarations: [
    D11Component,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
})
export class D11Module { }
