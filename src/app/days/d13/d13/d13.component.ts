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

  protected extraPackets: Packet[] = [
    [[2]],
    [[6]],
  ];

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
    this.inputService.get('13').pipe(
      tap(() => {startTime = performance.now();}),
      tap(input => this.processInput(input)),
      tap(() => this.process()),
      tap(() => this.processPart2()),
      tap(() => {console.log(`Took ${performance.now() - startTime}ms`);}),
    ).subscribe();
  }

  protected processInput(input: string[]): void {
    for (let i = 0; i < input.length; i++) {
      const line = input[i];
      if (line === '') continue;
      const nextLine = input[i + 1];

      const left: Packet = JSON.parse(`${line}`);
      const right: Packet = JSON.parse(`${nextLine}`);
      this.packetPairs.push([left, right]);
      i++;
    }
  }

  protected process(): void {
    let total = 0;
    for (let i = 0; i < this.packetPairs.length; i++) {
      const packetPair = this.packetPairs[i];
      const result = this.processPacketPair(packetPair[0], packetPair[1]);
      if (result === -1) {
        total += i+1
      }
    }
    console.log(total);
  }

  protected processPart2(): void {
    const packets: Packet[] = [...this.packetPairs.flat(), ...this.extraPackets];
    packets.sort((left, right) => this.processPacketPair(left, right));

    let total = 1;
    for (const extraPacket of this.extraPackets) {
      total *= packets.findIndex(p => p === extraPacket) + 1;
    }

    console.log(total);
  }

  protected processPacketPair(left: PacketData, right: PacketData): -1|0|1 {
    if (!Array.isArray(right) && Array.isArray(left)) {
      return this.processPacketPair(left, [right]);
    }
    if (!Array.isArray(left) && Array.isArray(right)) {
      return this.processPacketPair([left], right);
    }

    if (Array.isArray(left) && Array.isArray(right)) {
      let i = 0;
      for (; i < left.length; i++) {
        if (right.length <= i) {
          return 1;
        }
        const process = this.processPacketPair(left[i], right[i]);
        if (process == 1) {
          return 1;
        }
        if (process == -1) {
          return -1;
        }
      }

      if (right.length > i) return -1;

      return 0;
    }

    if (left < right) {
      return -1;
    }

    if (left > right) {
      return 1;
    }

    return 0;
  }
}
