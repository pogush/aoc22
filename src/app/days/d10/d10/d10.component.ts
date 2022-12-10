import {AfterViewInit, Component, OnDestroy} from '@angular/core';
import {InputService} from "../../../core/input/input.service";
import {EngineService} from "../../../core/engine/engine.service";
import {CanvasService} from "../../../core/canvas/canvas.service";
import {tap} from "rxjs";

@Component({
  selector: 'app-d10',
  template: ``,
})
export class D10Component implements AfterViewInit, OnDestroy {
  constructor(
    protected inputService: InputService,
    protected engineService: EngineService,
    protected canvasService: CanvasService,
  ) {
  }

  public ngOnDestroy(): void {
    this.engineService.interrupt();
  }

  public ngAfterViewInit(): void {
    let startTime: number;
    this.inputService.get('10', true).pipe(
      tap(() => {startTime = performance.now();}),
      tap(input => this.processInput(input)),
      // tap(() => this.process()),
      tap(() => {console.log(`Took ${performance.now() - startTime}ms`);}),
    ).subscribe();
  }

  public processInput(input: string[]): void {

  }
}
