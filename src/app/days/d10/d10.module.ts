import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { D10Component } from './d10/d10.component';
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {
    path: '',
    component: D10Component,
  },
];

@NgModule({
  declarations: [
    D10Component,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
})
export class D10Module { }
