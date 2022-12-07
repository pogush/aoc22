import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { InputService } from '../../../core/input/input.service';
import { EngineService } from '../../../core/engine/engine.service';
import { CanvasService } from '../../../core/canvas/canvas.service';
import { tap } from 'rxjs';

class File {
  constructor(
    public name: string,
    public size: number,
  ) {}
}

class Directory {
  public totalSize: number = 0;

  public parent: Directory | null = null;
  public children: Directory[] = [];
  public contents: File[] = [];

  constructor(
    public name: string = '/'
  ) {
  }
}

class FileSystem {
  constructor(
    public root: Directory,
  ) {}
}

class Command {
  public result: string[] = [];

  constructor(
    public command: string,
  ) {}

  public addResultLine(resultLine: string): void {
    this.result.push(resultLine);
  }
}

@Component({
  selector: 'app-d07',
  template: ``,
})
export class D07Component implements AfterViewInit, OnDestroy {

  protected commands: Command[] = [];
  protected fileSystem: FileSystem = new FileSystem(new Directory());

  protected part1MaxSpace: number = 100000;
  protected totalSpace: number = 70000000;
  protected neededSpace: number = 30000000;

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
    this.inputService.get('07').pipe(
      tap(input => this.processInput(input)),
      tap(() => this.processCommands()),
      tap(() => this.processTotalSize(this.fileSystem.root)),
      tap(() => this.processPart1()),
      tap(() => this.processPart2()),
    ).subscribe();
  }

  protected processInput(input: string[]): void {
    let latestCommand: Command | null = null;

    for (const line of input) {
      if (line === '') continue;

      if (line.charAt(0) === '$') {
        if (latestCommand !== null) {
          this.commands.push(latestCommand);
        }
        latestCommand = new Command(line);
        continue;
      }

      if (latestCommand === null) throw new Error();

      latestCommand.addResultLine(line);
    }

    if (latestCommand !== null && latestCommand !== this.commands[this.commands.length - 1]) {
      this.commands.push(latestCommand);
    }
  }

  protected processCommands(): void {
    let currentDirectory = this.fileSystem.root;

    for (const command of this.commands) {
      const commandParts = command.command.match(/^\$ (cd|ls) ?(.*)$/);
      if (commandParts === null) throw new Error();
      const commandType = commandParts[1] as 'ls'|'cd';
      const commandArgument = commandParts[2] || null;

      switch (commandType) {
        case 'cd': {
          if (commandArgument === null) throw new Error();

          if (commandArgument === '/') {
            currentDirectory = this.fileSystem.root;
          } else if (commandArgument === '..') {
            if (currentDirectory.parent === null) throw new Error();
            currentDirectory = currentDirectory.parent;
          } else {
            let dir = currentDirectory.children.find(d => d.name === commandArgument);
            if (dir === undefined) {
              dir = new Directory(commandArgument);
              dir.parent = currentDirectory;
              currentDirectory.children.push(dir);
            }
            currentDirectory = dir;
          }
          break;
        }
        case 'ls': {
          for (const resultLine of command.result) {
            let resultParts = resultLine.match(/^(dir|\d+) (.*)$/);
            if (resultParts === null) throw new Error();
            const listType = resultParts[1] === 'dir' ? 'directory' : 'file';
            const listSize = listType === 'directory' ? 0 : parseInt(resultParts[1]);
            const listName = resultParts[2];

            if (listType === 'directory') {
              if (currentDirectory.children.find(d => d.name === listName) === undefined) {
                const dir = new Directory(listName);
                dir.parent = currentDirectory;
                currentDirectory.children.push(dir);
              }
            } else {
              if (currentDirectory.contents.find(f => f.name === listName) === undefined) {
                const file = new File(listName, listSize);
                currentDirectory.contents.push(file);
              }
            }
          }
          break;
        }
      }
    }
  }

  protected processTotalSize(directory: Directory): number {
    let totalSize: number = 0;

    for (const file of directory.contents) {
      totalSize += file.size;
    }

    for (const childDirectory of directory.children) {
      totalSize += this.processTotalSize(childDirectory);
    }

    directory.totalSize = totalSize;

    return totalSize;
  }

  protected walkPart1(directory: Directory): number {
    let total: number = 0;

    if (directory.totalSize <= this.part1MaxSpace) {
      total += directory.totalSize;
    }

    for (const childDirectory of directory.children) {
      total += this.walkPart1(childDirectory);
    }

    return total;
  }

  protected walkPart2(spaceToFree: number, directory: Directory, lowestFound: number): number {
    if (directory.totalSize >= spaceToFree && directory.totalSize < lowestFound) {
      lowestFound = directory.totalSize;
    }

    for (const childDirectory of directory.children) {
      lowestFound = this.walkPart2(spaceToFree, childDirectory, lowestFound);
    }

    return lowestFound;
  }

  protected processPart1(): void {
    const resultPart1 = this.walkPart1(this.fileSystem.root);
    console.log('Part1', resultPart1);
  }

  protected processPart2(): void {
    const spaceToFree = this.neededSpace - (this.totalSpace - this.fileSystem.root.totalSize);
    const resultPart2 = this.walkPart2(spaceToFree, this.fileSystem.root, this.totalSpace);
    console.log('Part2', resultPart2);
  }
}
