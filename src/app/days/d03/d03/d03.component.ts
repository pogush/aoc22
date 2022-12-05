import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { InputService } from '../../../core/input/input.service';
import { EngineService } from '../../../core/engine/engine.service';
import { CanvasService } from '../../../core/canvas/canvas.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-d03',
  template: ``,
})
export class D03Component implements AfterViewInit, OnDestroy {

  protected lowercaseStartingCode: number = 97;
  protected uppercaseStartingCode: number = 65;

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
    this.inputService.get('03').pipe(
      tap(input => this.process(input)),
      tap(input => this.process2(input)),
      // tap(() => this.bootstrap()),
    ).subscribe();
  }

  protected process(input: string[]): void {
    let totalPriority = 0;
    for (const line of input) {
      if (line === '') continue;

      const half = line.length / 2;
      const part1 = line.substring(0, half).split('');
      const part2 = line.substring(half).split('');

      let char = part1.find(c => part2.includes(c));
      if (char === undefined) {
        char = part2.find(c => part1.includes(c));
      }
      if (char === undefined) {
        throw new Error();
      }

      totalPriority += this.getCharPriority(char);
    }
    const resultPart1 = totalPriority;
    console.log('Part1', resultPart1);
  }

  protected process2(input: string[]): void {
    let totalPriority = 0;
    let index = 0;
    let commonChars: string[] = [];
    for (const line of input) {
      if (line === '') continue;
      index++;

      if (index === 1) {
        commonChars = line.split('').filter((c, i) => line.indexOf(c) === i);
        continue;
      } else {
        const chars = line.split('');
        commonChars = commonChars.filter(c => chars.includes(c));
      }

      if (index !== 3) continue;

      if (commonChars.length !== 1) {
        throw new Error();
      }

      index = 0;
      totalPriority += this.getCharPriority(commonChars[0]);
    }

    const resultPart2 = totalPriority;
    console.log('Part2', resultPart2);
  }

  protected getCharPriority(char: string): number {
    const charCode = char.charCodeAt(0);
    return charCode >= this.lowercaseStartingCode ?
      charCode - this.lowercaseStartingCode + 1 :
      charCode - this.uppercaseStartingCode + 1 + 26;
  }
}
