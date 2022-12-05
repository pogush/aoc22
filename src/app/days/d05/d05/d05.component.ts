import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { InputService } from '../../../core/input/input.service';
import { EngineService } from '../../../core/engine/engine.service';
import { CanvasService } from '../../../core/canvas/canvas.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-d05',
  template: ``,
})
export class D05Component implements AfterViewInit, OnDestroy {

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
    this.inputService.get('05').pipe(
      tap(input => this.process(input)),
      // tap(input => this.process2(input)),
      // tap(() => this.bootstrap()),
    ).subscribe();
  }

  protected process(input: string[]): void {
    const delimiterIndex = input.indexOf('');
    const stackInput = input.slice(0, delimiterIndex);
    const stackLength = stackInput.splice(-1)[0].split(' ').filter(n => n !== '').map(n => parseInt(n)).length;
    const movementInput = input.slice(delimiterIndex + 1)
      .filter(l => l !== '')
      .map(i => i.match(/move (\d+) from (\d+) to (\d+)/))
      .map(m => {
        if (m === null) throw Error();
        return [parseInt(m[1]), parseInt(m[2]), parseInt(m[3])];
      });

    const stacks: string[][] = Array.from(Array(stackLength), () => []);

    stackInput.forEach((stackInputLine) => {
      [...stackInputLine.matchAll(/\[([A-Z])] ?| {4}/g)]
        .forEach((m, i)=> {
          const item = m[1];
          if (item === undefined) return;
          stacks[i].unshift(item);
        });
    });

    const stacksCopy = [...stacks].map(s => [...s]);

    movementInput.forEach(([times, from, to]) => {
      while (times > 0) {
        times--;
        const item = stacks[from-1].pop();
        if (item === undefined) throw Error();
        stacks[to-1].push(item);
      }
    });

    movementInput.forEach(([times, from, to]) => {
      const moving: string[] = [];

      while (times > 0) {
        times--;
        const item = stacksCopy[from-1].pop();
        if (item === undefined) throw Error();
        moving.unshift(item);
      }

      stacksCopy[to-1].push(...moving);
    });

    const resultPart1 = stacks.reduce((acc, stack) => {
      const item = stack.pop();
      if (item === undefined) throw Error();
      return acc + item;
    }, '');

    const resultPart2 = stacksCopy.reduce((acc, stack) => {
      const item = stack.pop();
      if (item === undefined) throw Error();
      return acc + item;
    }, '');

    console.log('Part1', resultPart1);
    console.log('Part2', resultPart2);
  }
}
