import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { InputService } from '../../../core/input/input.service';
import { EngineService } from '../../../core/engine/engine.service';
import { CanvasService } from '../../../core/canvas/canvas.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-d04',
  template: ``,
})
export class D04Component implements AfterViewInit, OnDestroy {

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
    this.inputService.get('04').pipe(
      tap(input => this.process(input)),
      tap(input => this.process2(input)),
      // tap(() => this.bootstrap()),
    ).subscribe();
  }

  protected process(input: string[]): void {
    let count = 0;

    for (const line of input) {
      if (line === '') continue;
      const [range1, range2] = line.split(',');
      const [range1start, range1end] = range1.split('-');
      const [range2start, range2end] = range2.split('-');

      let from1 = parseInt(range1start);
      let to1 = parseInt(range1end);
      let from2 = parseInt(range2start);
      let to2 = parseInt(range2end);

      if (
        (from1 >= from2 && to1 <= to2) ||
        (from2 >= from1 && to2 <= to1)) {
        count++;
      }
    }

    const resultPart1 = count;
    console.log('Part1', resultPart1);
  }

  protected process2(input: string[]): void {
    let count = 0;

    for (const line of input) {
      if (line === '') continue;
      const [range1, range2] = line.split(',');
      const [range1start, range1end] = range1.split('-');
      const [range2start, range2end] = range2.split('-');

      let from1 = parseInt(range1start);
      let to1 = parseInt(range1end);
      let from2 = parseInt(range2start);
      let to2 = parseInt(range2end);

      if (
        (from1 <= from2 && to1 >= from2) ||
        (from2 <= from1 && to2 >= from1)) {
        count++;
      }
    }

    const resultPart2 = count;
    console.log('Part2', resultPart2);
  }
}
