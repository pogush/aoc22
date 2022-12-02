import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { MainRoutingModule } from './main-routing.module';
import { DayComponent } from './day/day.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    MainComponent,
    DayComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
  ],
})
export class MainModule { }
