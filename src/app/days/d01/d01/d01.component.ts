import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { InputService } from '../../../core/input/input.service';
import { tap } from 'rxjs';
import { EngineService } from '../../../core/engine/engine.service';
import { D01Scene } from './d01.scene';
import { CanvasService } from '../../../core/canvas/canvas.service';
import { Elf, emptyElf } from './elf.type';

@Component({
  selector: 'app-d01',
  template: ``,
})
export class D01Component implements AfterViewInit, OnDestroy {

  protected elves: Elf[] = [];

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
    this.inputService.get('01').pipe(
      tap(input => this.process(input)),
      tap(() => this.bootstrap()),
    ).subscribe();
  }

  protected bootstrap(): void {
    if (this.canvasService.canvas !== null) {
      const scene = new D01Scene(this.engineService)
      scene.setElves(this.elves);
      this.engineService.setScene(scene);
      this.engineService.bootstrap();
    }
  }

  protected process(input: string[]): void {
    const elves: Elf[] = [];
    let elf: Elf = emptyElf();
    for (const calories of input) {
      if (calories === '') {
        elf.total = elf.calories.reduce((sum, c) => sum + c, 0);
        elves.push(elf);
        elf = emptyElf();
        continue;
      }
      elf.calories.push(parseInt(calories));
    }
    elves.sort((a, b) => a.total - b.total).reverse();

    const min = elves[elves.length - 1].total;
    const max = elves[0].total;
    const top3sum = elves[0].total + elves[1].total + elves[2].total;
    const resultPart1 = max;
    const resultPart2 = top3sum;

    console.log('Part1', resultPart1);
    console.log('Part2', resultPart2);

    for (let i = elves.length; i<256; i++) {
      elves.push(emptyElf());
    }

    this.elves = elves
      .map((elf, index) => ({
        ...elf,
        scale: elf.total > 0 ? elf.total / max : min / max,
        ranking: index + 1,
      }))
      .map(elf => ({v: elf, r: Math.random()}))
      .sort((a, b) => a.r - b.r)
      .map(({v}) => v);
  }
}
