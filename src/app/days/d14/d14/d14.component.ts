import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { InputService } from '../../../core/input/input.service';
import { EngineService } from '../../../core/engine/engine.service';
import { CanvasService } from '../../../core/canvas/canvas.service';
import { tap } from 'rxjs';

class Coordinate {
  constructor(
    protected colIndex: number,
    protected rowIndex: number,
  ) {}

  public toString(): string {
    return `${this.colIndex},${this.rowIndex}`;
  }

  public down(): Coordinate {
    return new Coordinate(this.colIndex, this.rowIndex + 1);
  }

  public downLeft(): Coordinate {
    return new Coordinate(this.colIndex - 1, this.rowIndex + 1);
  }

  public downRight(): Coordinate {
    return new Coordinate(this.colIndex + 1, this.rowIndex + 1);
  }

  public get col(): number {
    return this.colIndex;
  }

  public get row(): number {
    return this.rowIndex;
  }
}

class Cave {
  protected rocks: Set<string> = new Set<string>();
  protected sands: Set<string> = new Set<string>();
  protected highestRow: number = 0;
  protected startingCoordinate = new Coordinate(500, 0);
  protected beforeSettled: Coordinate[] = [this.startingCoordinate];

  public addRock(coordinate: Coordinate): void {
    this.rocks.add(coordinate.toString());
    if (coordinate.row > this.highestRow) {
      this.highestRow = coordinate.row;
    }
  }

  public resetSands(): void {
    this.sands.clear();
    this.beforeSettled = [this.startingCoordinate];
  }

  public simulatePart1(): number {
    let hasFinished: boolean;
    do {
      const beforeSettled = this.beforeSettled.pop();
      if (beforeSettled === undefined) throw new Error();
      hasFinished = this.simulateSandPart1(beforeSettled);
    } while (!hasFinished);

    return this.sands.size;
  }

  protected simulateSandPart1(coordinate: Coordinate): boolean {
    if (coordinate.row > this.highestRow) return true;
    this.beforeSettled.push(coordinate);

    const down = coordinate.down();
    if (!this.isSpaceOccupied(down)) {
      return this.simulateSandPart1(down);
    }
    const downLeft = coordinate.downLeft();
    if (!this.isSpaceOccupied(downLeft)) {
      return this.simulateSandPart1(downLeft);
    }
    const downRight = coordinate.downRight();
    if (!this.isSpaceOccupied(downRight)) {
      return this.simulateSandPart1(downRight);
    }

    this.sands.add(coordinate.toString());
    this.beforeSettled.pop();
    return false;
  }

  public simulatePart2(): number {
    let hasFinished: boolean;
    do {
      const beforeSettled = this.beforeSettled.pop();
      if (beforeSettled === undefined) throw new Error();
      hasFinished = this.simulateSandPart2(beforeSettled);
    } while (!hasFinished);

    return this.sands.size;
  }

  protected simulateSandPart2(coordinate: Coordinate): boolean {
    this.beforeSettled.push(coordinate);
    const down = coordinate.down();
    if (!this.isSpaceOccupied(down, true)) {
      return this.simulateSandPart2(down);
    }
    const downLeft = coordinate.downLeft();
    if (!this.isSpaceOccupied(downLeft, true)) {
      return this.simulateSandPart2(downLeft);
    }
    const downRight = coordinate.downRight();
    if (!this.isSpaceOccupied(downRight, true)) {
      return this.simulateSandPart2(downRight);
    }

    const c = coordinate.toString();
    this.sands.add(c);
    this.beforeSettled.pop();

    return c === this.startingCoordinate.toString();
  }

  protected isSpaceOccupied(coordinate: Coordinate, withFloor: boolean = false): boolean {
    const c = coordinate.toString();
    return this.rocks.has(c) || this.sands.has(c) || (withFloor && coordinate.row === this.highestRow + 2);
  }
}

@Component({
  selector: 'app-d14',
  template: ``,
})
export class D14Component implements AfterViewInit, OnDestroy {

  protected cave: Cave = new Cave();

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
    this.inputService.get('14').pipe(
      tap(() => {startTime = performance.now();}),
      tap(input => this.processInput(input)),
      tap(() => this.process()),
      tap(() => {console.log(`Took ${performance.now() - startTime}ms`);}),
    ).subscribe();
  }

  protected processInput(input: string[]): void {
    for (const inputLine of input) {
      if (inputLine === '') continue;
      let coordinates = inputLine.split(' -> ').map(c => {
        const [col, row] = c.split(',').map(n => parseInt(n));
        return new Coordinate(col, row);
      });

      for (let i = 0; i < coordinates.length - 1; i++) {
        const start = coordinates[i];
        const end = coordinates[i + 1];

        if (start.row === end.row) {
          const row = start.row;
          let startCol = start.col;
          let endCol = end.col;
          if (start.col > end.col) {
            startCol = end.col;
            endCol = start.col;
          }

          for (let col = startCol; col <= endCol; col++) {
            this.cave.addRock(new Coordinate(col, row));
          }
        } else if (start.col === end.col) {
          const col = start.col;
          let startRow = start.row;
          let endRow = end.row;
          if (start.row > end.row) {
            startRow = end.row;
            endRow = start.row;
          }

          for (let row = startRow; row <= endRow; row++) {
            this.cave.addRock(new Coordinate(col, row));
          }
        }
      }
    }
  }

  protected process(): void {
    const resultPart1 = this.cave.simulatePart1();
    console.log(resultPart1);

    this.cave.resetSands();

    const resultPart2 = this.cave.simulatePart2();
    console.log(resultPart2);
  }
}
