import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { InputService } from '../../../core/input/input.service';
import { EngineService } from '../../../core/engine/engine.service';
import { CanvasService } from '../../../core/canvas/canvas.service';
import { tap } from 'rxjs';

type Coord = [number, number];
type Direction = 'R'|'L'|'D'|'U';
type Command = {
  direction: Direction;
  length: number;
}

@Component({
  selector: 'app-d09',
  template: ``,
})
export class D09Component implements AfterViewInit, OnDestroy {

  protected commands: Command[] = [];
  protected knots: Coord[] = [];
  protected visited: Set<string> = new Set<string>();

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
    this.inputService.get('09').pipe(
      tap(() => {startTime = performance.now();}),
      tap(input => this.processInput(input)),
      tap(() => this.process(2)),
      tap(() => this.process(10)),
      tap(() => {console.log(`Took ${performance.now() - startTime}ms`);}),
    ).subscribe();
  }

  protected processInput(input: string[]): void {
    for (const inputLine of input) {
      if (inputLine === '') continue;
      const commandParts = inputLine.match(/^([RLUD]) (\d+)$/);
      if (commandParts === null) throw new Error();
      const commandDirection = commandParts[1] as Direction;
      const commandLength = parseInt(commandParts[2]);
      this.commands.push({
        direction: commandDirection,
        length: commandLength,
      });
    }
  }

  protected process(ropeLength: number = 2): void {
    this.knots = [];
    this.visited.clear();
    for (let i = 0; i < ropeLength; i++) {
      this.knots.push([0,0]);
    }

    for (const command of this.commands) {
      const plusX = command.direction === 'R' ? 1 : command.direction === 'L' ? -1 : 0;
      const plusY = command.direction === 'U' ? 1 : command.direction === 'D' ? -1 : 0;
      for (let c = 0; c < command.length; c++) {
        this.knots[0][0] += plusX;
        this.knots[0][1] += plusY;

        for (let i = 1; i < this.knots.length; i++) {
          const head = this.knots[i - 1];
          const tail = this.knots[i];

          const diffX = head[0] - tail[0];
          const diffY = head[1] - tail[1];

          if (diffX === 2) {
            if (diffY === 1 || diffY === 2) {
              tail[0] += 1;
              tail[1] += 1;
            } else if (diffY === 0) {
              tail[0] += 1;
            } else if (diffY === -1 || diffY === -2) {
              tail[0] += 1;
              tail[1] -= 1;
            }
          } else if (diffX === -2) {
            if (diffY === 1 || diffY === 2) {
              tail[0] -= 1;
              tail[1] += 1;
            } else if (diffY === 0) {
              tail[0] -= 1;
            } else if (diffY === -1 || diffY === -2) {
              tail[0] -= 1;
              tail[1] -= 1;
            }
          } else if (diffY === 2) {
            if (diffX === 1) {
              tail[0] += 1;
              tail[1] += 1;
            } else if (diffX === 0) {
              tail[1] += 1;
            } else if (diffX === -1) {
              tail[0] -= 1;
              tail[1] += 1;
            }
          } else if (diffY === -2) {
            if (diffX === 1) {
              tail[0] += 1;
              tail[1] -= 1;
            } else if (diffX === 0) {
              tail[1] -= 1;
            } else if (diffX === -1) {
              tail[0] -= 1;
              tail[1] -= 1;
            }
          }
        }
        this.addToVisited(this.knots[this.knots.length - 1]);
      }
    }
    console.log(this.visited.size);
  }

  protected addToVisited(coord: Coord): void {
    const coordString = `[${coord[0]}:${coord[1]}]`;
    this.visited.add(coordString);
  }
}
