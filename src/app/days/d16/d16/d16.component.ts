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
  cache: Map<number, Map<string, number>>;
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
        cache: new Map<number, Map<string, number>>(),
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
    console.log('Part1', result);
  }

  protected process2(): void {
    const ids = this.valves.map(v => v.id).sort().slice(1);

    const arrange = (result: [string[], string[]][], partial: string[], partialInverse: string[], ids: string[]) => {
      const nextId = ids.shift();
      if (nextId === undefined) throw new Error();
      const partialWith = [...partial, nextId];
      const partialWithout = [...partial];
      const partialInverseWith = [...partialInverse];
      const partialInverseWithout = [...partialInverse, nextId];
      if (ids.length === 0) {
        result.push([partialWith, partialInverseWith], [partialWithout, partialInverseWithout]);
      } else {
        arrange(result, partialWith, partialInverseWith, [...ids]);
        arrange(result, partialWithout, partialInverseWithout, [...ids]);
      }
    };

    const result: [string[], string[]][] = [];
    arrange(result, [], [], ids);
    const arrangements = result.slice(0, Math.floor(result.length / 2));

    let max = 0;
    let total = arrangements.length;
    for (let i = 0; i < total; i++) {
      max = Math.max(max, this.traverse('AA', 26, arrangements[i][0]) +  this.traverse('AA', 26, arrangements[i][1]));
      if (i % 200 === 0) {
        console.log(`At ${i}`);
      }
    }

    console.log('Part2', max);
  }

  protected traverse(currentValveId: string, remainingTime: number, openedValves: string[]): number {
    let maxPressure = 0;
    let valve = this.valves.find(v => v.id === currentValveId);
    if (valve === undefined) throw new Error();

    const cachedOpenedValves = openedValves.join('');
    let cachedValue1 = valve.cache.get(remainingTime);
    if (cachedValue1 !== undefined) {
      const cachedValue2 = cachedValue1.get(cachedOpenedValves);
      if (cachedValue2 !== undefined) {
        return cachedValue2;
      }
    } else {
      valve.cache.set(remainingTime, new Map<string, number>());
      cachedValue1 = valve.cache.get(remainingTime);
      if (cachedValue1 === undefined) throw new Error();
    }

    for (const connection of valve.connections) {
      if (openedValves.includes(connection.to)) continue;
      const newRemainingTime = remainingTime - (connection.cost + 1);
      if (remainingTime <= 0) continue;
      const connectedValve = this.valves.find(v => v.id === connection.to);
      if (connectedValve === undefined) throw new Error();
      const newOpenedValves = [...openedValves, connectedValve.id].sort();
      const traverseResult = this.traverse(connectedValve.id, newRemainingTime, newOpenedValves) + connectedValve.rate * newRemainingTime;
      maxPressure = Math.max(maxPressure, traverseResult);
    }
    cachedValue1.set(cachedOpenedValves, maxPressure);
    return maxPressure;
  }
}
