import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { DayComponent } from './day/day.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadChildren: () => import('../home/home.module').then(m => m.HomeModule),
      },
      {
        path: 'day',
        component: DayComponent,
        children: [
          {
            path: '1',
            redirectTo: '01',
          },
          {
            path: '01',
            loadChildren: () => import('../days/d01/d01.module').then(m => m.D01Module),
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class MainRoutingModule { }
