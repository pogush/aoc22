import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { InputService } from '../../../core/input/input.service';
import { EngineService } from '../../../core/engine/engine.service';
import { CanvasService } from '../../../core/canvas/canvas.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-d06',
  template: ``,
})
export class D06Component implements AfterViewInit, OnDestroy {
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
    this.inputService.get('06').pipe(
      tap(input => this.process(input)),
      // tap(input => this.process2(input)),
      // tap(() => this.bootstrap()),
    ).subscribe();
  }

  protected process(input: string[]): void {
    const letters = input[0].split('');
    // for (let i = 0; i <= letters.length - 4; i++) {
    //   const [l1, l2, l3, l4] = letters.slice(i, i + 4);
    //   if (l1 === l2 || l1 === l3 || l1 === l4) continue;
    //   if (l2 === l3 || l2 === l4) {
    //     i++;
    //     continue;
    //   }
    //   if (l3 === l4) {
    //     i+=2;
    //     continue;
    //   }
    //   console.log(i+4);
    //   return;
    // }

    console.log('Part1', this.lookForMarker(4, letters));
    console.log('Part2', this.lookForMarker(14, letters));
  }

  protected lookForMarker(length: number, letters: string[]): number {
    outer: for (let i = 0; i <= letters.length - length; i++) {
      const slice = letters.slice(i, i + length);
      for (let y = 0; y < length; y++) {
        const ref = slice[y];
        const others = slice.slice(y + 1);
        if (others.includes(ref)) {
          i += y;
          continue outer;
        }
      }
      return i + length;
    }
    throw new Error();
  }
}
