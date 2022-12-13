import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { InputService } from '../../../core/input/input.service';
import { EngineService } from '../../../core/engine/engine.service';
import { CanvasService } from '../../../core/canvas/canvas.service';
import { tap } from 'rxjs';

type Packet = PacketData[];
type PacketData = number | number[] | PacketData[];

@Component({
  selector: 'app-d13',
  template: ``,
})
export class D13Component implements AfterViewInit, OnDestroy {

  protected packetPairs: [Packet, Packet][] = [];

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
    this.inputService.get('13', true).pipe(
      tap(() => {startTime = performance.now();}),
      tap(input => this.processInput(input)),
      tap(() => this.process()),
      // tap(() => this.processPart2()),
      tap(() => {console.log(`Took ${performance.now() - startTime}ms`);}),
    ).subscribe();
  }

  protected processInput(input: string[]): void {
    for (let i = 0; i < input.length; i++) {
      const line = input[i];
      if (line === '') continue;
      const nextLine = input[i + 1];

      const left: Packet = JSON.parse(`"${line}"`);
      const right: Packet = JSON.parse(`"${line}"`);
      this.packetPairs.push([left, right]);
      i++;
    }
  }

  protected process(): void {
    let total = 0;
    for (let i = 0; i < this.packetPairs.length; i++) {
      const packetPair = this.packetPairs[i];
      const result = this.processPacketPair(packetPair[0], packetPair[1]);
      console.log(i, result);
      total += i+1
    }
    console.log(total);
  }

  protected processPacketPair(left: PacketData, right: PacketData): -1|0|1 {
    // console.log(left, right);
    if (!Array.isArray(right) && Array.isArray(left)) {
      return this.processPacketPair(left, [right]);
    }
    if (!Array.isArray(left) && Array.isArray(right)) {
      return this.processPacketPair([left], right);
    }

    if (Array.isArray(left) && Array.isArray(right)) {
      if (right.length < left.length) return -1;
      for (let i = 0; i < right.length; i++) {
        const process = this.processPacketPair(left[i], right[i]);
        if (process == -1) return -1;
        if (process == 1) return 1;
      }

      return 0;
    }

    if (left < right) {
      return 1;
    }

    if (left > right) {
      return -1;
    }

    return 0;
  }
}
