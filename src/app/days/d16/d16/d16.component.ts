import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { InputService } from '../../../core/input/input.service';
import { EngineService } from '../../../core/engine/engine.service';
import { CanvasService } from '../../../core/canvas/canvas.service';
import { tap } from 'rxjs';

type Connection = {
  to: string;
  cost: number;
}

type Valve = {
  id: string;
  rate: number;
  connections: Connection[];
  cache: Map<[number, string], number>;
}

@Component({
  selector: 'app-d16',
  template: ``,
})
export class D16Component implements AfterViewInit, OnDestroy {

  protected valves: Valve[] = [];

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
    this.inputService.get('16').pipe(
      tap(() => {startTime = performance.now();}),
      tap(input => this.processInput(input)),
      tap(() => this.process()),
      tap(() => this.process2()),
      tap(() => {console.log(`Took ${performance.now() - startTime}ms`);}),
    ).subscribe();
  }

  protected processInput(input: string[]): void {
    for (const inputLine of input) {
      if (inputLine === '') continue;
      const matches = inputLine.match(/^Valve ([A-Z]{2}) has flow rate=(\d+); tunnels? leads? to valves? (.*)$/);
      if (matches === null) throw new Error();

      this.valves.push({
        id: matches[1],
        rate: parseInt(matches[2]),
        connections: matches[3].split(', ').map((id) =>({
          to: id,
          cost: 1,
        })),
        cache: new Map<[number, string], number>(),
      });
    }

    const simplifiedValves: Valve[] = [];

    for (const valve of this.valves) {
      if (valve.id !== 'AA' && valve.rate === 0) continue;

      const queue: [string, number][] = [[valve.id, 0]];
      const visited: Set<string> = new Set<string>();
      const connections: Connection[] = [];

      while (queue.length > 0) {
        const [queuedValveId, cost] = queue.shift()!;
        if (visited.has(queuedValveId)) continue;
        visited.add(queuedValveId);
        const queuedValve = this.valves.find(v => v.id === queuedValveId);
        if (queuedValve === undefined) throw new Error();

        if (queuedValve.id !== valve.id && queuedValve.rate > 0) {
          connections.push({
            to: queuedValve.id,
            cost: cost,
          });
        }

        for (const connection of queuedValve.connections) {
          if (visited.has(connection.to)) continue;
          queue.push([connection.to, cost + connection.cost]);
        }
      }

      simplifiedValves.push({
        ...valve,
        connections: connections,
      });
    }

    this.valves = simplifiedValves;
  }

  protected process(): void {
    const result = this.traverse('AA', 30, []);
    console.log(result);
  }

  protected process2(): void {
    this.valves.forEach(v => v.cache.clear());
    const ids = this.valves.map(v => v.id);
    // const permutations = permute();
    console.log(ids);
  }

  protected traverse(currentValveId: string, remainingTime: number, openedValves: string[]): number {
    let maxPressure = 0;
    let valve = this.valves.find(v => v.id === currentValveId);
    if (valve === undefined) throw new Error();

    const cachedOpenedValves = openedValves.join('');
    const cachedValue = valve.cache.get([remainingTime, cachedOpenedValves]);
    if (cachedValue !== undefined) return cachedValue;

    for (const connection of valve.connections) {
      if (openedValves.includes(connection.to)) continue;
      const newRemainingTime = remainingTime - (connection.cost + 1);
      if (remainingTime <= 0) continue;
      const connectedValve = this.valves.find(v => v.id === connection.to);
      if (connectedValve === undefined) throw new Error();
      const traverseResult = this.traverse(connectedValve.id, newRemainingTime, [...openedValves, connectedValve.id].sort()) + connectedValve.rate * newRemainingTime;
      maxPressure = Math.max(maxPressure, traverseResult);
    }

    valve.cache.set([remainingTime, cachedOpenedValves], maxPressure);
    return maxPressure;
  }

  protected traverse2(currentValveId: string, remainingTime: number, openedValves: string[]): number {
    let maxPressure = 0;
    let valve = this.valves.find(v => v.id === currentValveId);
    if (valve === undefined) throw new Error();

    const cachedOpenedValves = openedValves.join('');
    const cachedValue = valve.cache.get([remainingTime, cachedOpenedValves]);
    if (cachedValue !== undefined) return cachedValue;

    for (const connection of valve.connections) {
      if (openedValves.includes(connection.to)) continue;
      const newRemainingTime = remainingTime - (connection.cost + 1);
      if (remainingTime <= 0) continue;
      const connectedValve = this.valves.find(v => v.id === connection.to);
      if (connectedValve === undefined) throw new Error();
      const traverseResult = this.traverse(connectedValve.id, newRemainingTime, [...openedValves, connectedValve.id].sort()) + connectedValve.rate * newRemainingTime;
      maxPressure = Math.max(maxPressure, traverseResult);
    }

    valve.cache.set([remainingTime, cachedOpenedValves], maxPressure);
    return maxPressure;
  }
}
