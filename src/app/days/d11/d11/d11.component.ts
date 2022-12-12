import {AfterViewInit, Component, OnDestroy} from '@angular/core';
import {InputService} from "../../../core/input/input.service";
import {EngineService} from "../../../core/engine/engine.service";
import {CanvasService} from "../../../core/canvas/canvas.service";
import {tap} from "rxjs";

type Operation = '*' | '+';
type Operand = 'old' | number;

// type Item = {
//   factors: {[key: number]: number}
// }

type Monkey = {
  items: number[];
  operation: Operation;
  operand: Operand;
  test: number;
  monkeyTrue: number;
  monkeyFalse: number;
  itemsInspected: number;
}

class Simulation {
  protected monkeys: Monkey[] = [];
  protected modulo: number = 1;

  public addMonkey(monkey: Monkey): void {
    this.monkeys.push(monkey);
    this.modulo *= monkey.test;
  }

  public simulateFirst(numberOfRounds: number): number {
    for (let i = 0; i < numberOfRounds; i++) {
      this.simulateRoundFirst();
    }

    const sortedMonkeys = this.monkeys.sort((a, b) => b.itemsInspected - a.itemsInspected);
    return sortedMonkeys[0].itemsInspected * sortedMonkeys[1].itemsInspected;
  }

  public simulateSecond(numberOfRounds: number): number {
    for (let i = 0; i < numberOfRounds; i++) {
      this.simulateRoundSecond();
    }

    const sortedMonkeys = this.monkeys.sort((a, b) => b.itemsInspected - a.itemsInspected);
    return sortedMonkeys[0].itemsInspected * sortedMonkeys[1].itemsInspected;
  }

  public simulateRoundFirst(): void {
    for (const monkey of this.monkeys) {
      for (const item of monkey.items) {
        monkey.itemsInspected++;
        const result = this.doOperation(item, monkey.operation, monkey.operand);
        const worryLevel = Math.floor(result / 3);
        const targetMonkeyIndex = worryLevel % monkey.test === 0 ? monkey.monkeyTrue : monkey.monkeyFalse;
        this.monkeys[targetMonkeyIndex].items.push(worryLevel);
      }
      monkey.items = [];
    }
  }

  public simulateRoundSecond(): void {
    for (const monkey of this.monkeys) {
      for (const item of monkey.items) {
        monkey.itemsInspected++;
        const result = this.doOperation(item, monkey.operation, monkey.operand);
        const worryLevel = result % this.modulo;
        const targetMonkeyIndex = worryLevel % monkey.test === 0 ? monkey.monkeyTrue : monkey.monkeyFalse;
        this.monkeys[targetMonkeyIndex].items.push(worryLevel);
      }
      monkey.items = [];
    }
  }

  protected doOperation(old: number, operation: Operation, operand: Operand): number {
    if (operand === 'old') operand = old;
    if (operation === '+') {
      return old + operand;
    } else {
      return old * operand;
    }
  }
}

@Component({
  selector: 'app-d11',
  template: ``,
})
export class D11Component implements AfterViewInit, OnDestroy {

  protected simulationFirst: Simulation = new Simulation();
  protected simulationSecond: Simulation = new Simulation();

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
    this.inputService.get('11').pipe(
      tap(() => {startTime = performance.now();}),
      tap(input => this.processInput(input)),
      tap(() => this.process()),
      tap(() => {console.log(`Took ${performance.now() - startTime}ms`);}),
    ).subscribe();
  }

  protected processInput(input: string[]): void {
    for (let i = 0; i < input.length / 7; i++) {
      const start: number = i * 7;
      const items = input[start + 1].substring(18).split(', ').map(n => parseInt(n));
      const operation = input[start + 2][23] as Operation;
      const operandInput = input[start + 2].substring(25);
      const operand = operandInput === 'old' ? 'old' : parseInt(operandInput);
      const test = parseInt(input[start + 3].substring(21));
      const monkeyTrue = parseInt(input[start + 4].substring(29));
      const monkeyFalse = parseInt(input[start + 5].substring(30));
      this.simulationFirst.addMonkey({
        items: [...items],
        operation,
        operand,
        test,
        monkeyTrue,
        monkeyFalse,
        itemsInspected: 0,
      });
      this.simulationSecond.addMonkey({
        items: [...items],
        operation,
        operand,
        test,
        monkeyTrue,
        monkeyFalse,
        itemsInspected: 0,
      });
    }
  }

  protected process(): void {
    const resultPart1 = this.simulationFirst.simulateFirst(20);
    console.log('Part1', resultPart1);
    const resultPart2 = this.simulationSecond.simulateSecond(10000);
    console.log('Part2', resultPart2);
  }
}
