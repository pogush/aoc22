import {AfterViewInit, Component, OnDestroy} from '@angular/core';
import {InputService} from "../../../core/input/input.service";
import {EngineService} from "../../../core/engine/engine.service";
import {CanvasService} from "../../../core/canvas/canvas.service";
import {tap} from "rxjs";
import { Part } from '../../../core/days/part.type';

type CommandType = 'noop' | 'addx';

class Command {
  constructor(
    public type: CommandType,
    public value: number,
  ) {}
}

class Program {

  protected running: boolean = false;
  protected x: number = 1;
  protected currentCommandIndex: number = 0;
  protected currentCommandCycle: number = 0;
  protected currentCycle: number = 0;

  protected resultPart1: number = 0;
  protected resultPart2: string = '';

  constructor(
    public commands: Command[],
  ) {}

  public run(): void {
    this.running = true;
    while (this.running) {
      this.currentCycle++;

      if ((this.currentCycle - 20) % 40 === 0) {
        this.resultPart1 += this.currentCycle * this.x;
      }

      const posX = (this.currentCycle % 40) - 1;
      this.resultPart2 += ((this.x >= posX - 1 && this.x <= posX + 1) ? '#' : '.');

      const command = this.commands[this.currentCommandIndex];
      this.currentCommandCycle++;

      if (command.type === 'noop' && this.currentCommandCycle === 1) {
        this.currentCommandCycle = 0;
        this.currentCommandIndex++;
      } else if (command.type === 'addx' && this.currentCommandCycle === 2) {
        this.x += command.value;
        this.currentCommandCycle = 0;
        this.currentCommandIndex++;
      }

      if (this.currentCommandIndex >= this.commands.length) {
        this.running = false;
      }
    }
  }

  public getResult(part: Part): string {
    if (part === '1') {
      return `${this.resultPart1}`;
    } else {
      let result = "\n";
      for (let i = 0; i < this.resultPart2.length; i++) {
        result += this.resultPart2[i];
        if (i > 0 && (i+1) % 40 == 0) {
          result += "\n";
        }
      }
      return result;
    }
  }
}

@Component({
  selector: 'app-d10',
  template: ``,
})
export class D10Component implements AfterViewInit, OnDestroy {

  protected commands: Command[] = [];

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
    this.inputService.get('10').pipe(
      tap(() => {startTime = performance.now();}),
      tap(input => this.processInput(input)),
      tap(() => this.process()),
      tap(() => {console.log(`Took ${performance.now() - startTime}ms`);}),
    ).subscribe();
  }

  public processInput(input: string[]): void {
    for (const inputLine of input) {
      if (inputLine === '') continue;
      let parts = inputLine.match(/^(addx|noop) ?(-?\d*)?$/);
      if (parts === null) throw new Error();
      const commandType = parts[1] as CommandType;
      const commandValue = commandType === 'addx' ? parseInt(parts[2]) : 0;

      this.commands.push(new Command(commandType, commandValue));
    }
  }

  public process(): void {
    const program = new Program(this.commands);
    program.run();
    console.log('Part1', program.getResult('1'));
    console.log('Part2', program.getResult('2'));
  }
}
