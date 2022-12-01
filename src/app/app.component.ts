import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { InputService } from './core/input/input.service';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent implements OnInit {
  constructor(
    protected inputService: InputService,
  ) {
  }

  public ngOnInit(): void {
    this.inputService.get('01', '1').pipe(
      tap(console.log),
    ).subscribe();
  }
}
