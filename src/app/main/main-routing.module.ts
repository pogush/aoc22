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
          {
            path: '2',
            redirectTo: '02',
          },
          {
            path: '02',
            loadChildren: () => import('../days/d02/d02.module').then(m => m.D02Module),
          },
          {
            path: '3',
            redirectTo: '03',
          },
          {
            path: '03',
            loadChildren: () => import('../days/d03/d03.module').then(m => m.D03Module),
          },
          {
            path: '4',
            redirectTo: '04',
          },
          {
            path: '04',
            loadChildren: () => import('../days/d04/d04.module').then(m => m.D04Module),
          },
          {
            path: '5',
            redirectTo: '05',
          },
          {
            path: '05',
            loadChildren: () => import('../days/d05/d05.module').then(m => m.D05Module),
          },
          {
            path: '6',
            redirectTo: '06',
          },
          {
            path: '06',
            loadChildren: () => import('../days/d06/d06.module').then(m => m.D06Module),
          },
          {
            path: '7',
            redirectTo: '07',
          },
          {
            path: '07',
            loadChildren: () => import('../days/d07/d07.module').then(m => m.D07Module),
          },
          {
            path: '8',
            redirectTo: '08',
          },
          {
            path: '08',
            loadChildren: () => import('../days/d08/d08.module').then(m => m.D08Module),
          },
          {
            path: '9',
            redirectTo: '09',
          },
          {
            path: '09',
            loadChildren: () => import('../days/d09/d09.module').then(m => m.D09Module),
          },
          {
            path: '10',
            loadChildren: () => import('../days/d10/d10.module').then(m => m.D10Module),
          },
          {
            path: '11',
            loadChildren: () => import('../days/d11/d11.module').then(m => m.D11Module),
          },
          {
            path: '12',
            loadChildren: () => import('../days/d12/d12.module').then(m => m.D12Module),
          },
          {
            path: '13',
            loadChildren: () => import('../days/d13/d13.module').then(m => m.D13Module),
          },
          {
            path: '14',
            loadChildren: () => import('../days/d14/d14.module').then(m => m.D14Module),
          },
          {
            path: '15',
            loadChildren: () => import('../days/d15/d15.module').then(m => m.D15Module),
          },
          {
            path: '16',
            loadChildren: () => import('../days/d16/d16.module').then(m => m.D16Module),
          },
          {
            path: '17',
            loadChildren: () => import('../days/d17/d17.module').then(m => m.D17Module),
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
