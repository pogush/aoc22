import {AfterViewInit, Component, OnDestroy} from '@angular/core';
import {InputService} from "../../../core/input/input.service";
import {EngineService} from "../../../core/engine/engine.service";
import {CanvasService} from "../../../core/canvas/canvas.service";
import {tap} from "rxjs";

class Coordinate {
  constructor(
    public x: number,
    public y: number,
  ) {}

  public toString(): string {
    return `[${this.x}:${this.y}]`;
  }
}

class Sensor {
  protected range: number;

  constructor(
    public position: Coordinate,
    public beaconPosition: Coordinate,
  ) {
    this.range = Math.abs(this.position.x - this.beaconPosition.x) + Math.abs(this.position.y - this.beaconPosition.y);
  }

  public getFreeXs(y: number): [number, number] | null {
    const minDistance = Math.abs(this.position.y - y);
    const maxDistance = this.range - minDistance;
    if (maxDistance < 0) return null;

    return [
      this.position.x - maxDistance,
      this.position.x + maxDistance,
    ];
  }
}

@Component({
  selector: 'app-d15',
  template: ``,
})
export class D15Component implements AfterViewInit, OnDestroy {

  protected sensors: Sensor[] = [];

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
    this.inputService.get('15').pipe(
      tap(() => {startTime = performance.now();}),
      tap(input => this.processInput(input)),
      tap(() => this.process()),
      tap(() => {console.log(`Took ${performance.now() - startTime}ms`);}),
    ).subscribe();
  }

  protected processInput(input: string[]): void {
    for (const inputLine of input) {
      if (inputLine === '') continue;
      const part = inputLine.substring(12);
      const [part1, part2] = part.split(': closest beacon is at x=');
      const [sensorXString, sensorYString] = part1.split(', y=');
      const [beaconXString, beaconYString] = part2.split(', y=');
      this.sensors.push(
        new Sensor(
          new Coordinate(parseInt(sensorXString), parseInt(sensorYString)),
          new Coordinate(parseInt(beaconXString), parseInt(beaconYString)),
        ),
      );
    }
  }

  protected process(): void {
    const lineY: number = 2000000;
    const ranges: [number, number][] = [];
    const beaconsOnLine: Set<string> = new Set<string>();

    for (const sensor of this.sensors) {
      const range = sensor.getFreeXs(lineY);
      if (range === null) continue;

      ranges.push(range);
      if (sensor.beaconPosition.y === lineY) {
        beaconsOnLine.add(sensor.beaconPosition.toString());
      }
    }
    ranges.sort((a, b) => a[1] - b[1]);
    ranges.sort((a, b) => a[0] - b[0]);

    const xRangeStack: [number, number][] = [];

    for (const range of ranges) {
      if (xRangeStack.length === 0) {
        xRangeStack.push(range);
        continue;
      }

      if (range[0] > xRangeStack[xRangeStack.length - 1][1]) {
        xRangeStack.push(range);
        continue;
      }

      const topOfStack = xRangeStack.pop();
      if (topOfStack === undefined) throw new Error();
      topOfStack[1] = Math.max(range[1], topOfStack[1]);
      xRangeStack.push(topOfStack);
    }

    const result = xRangeStack.reduce((acc, [start, end]) => Math.abs(end - start) + acc + 1, 0) - beaconsOnLine.size;

    console.log(result);
  }
}
