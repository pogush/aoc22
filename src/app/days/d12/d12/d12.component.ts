import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { InputService } from '../../../core/input/input.service';
import { EngineService } from '../../../core/engine/engine.service';
import { CanvasService } from '../../../core/canvas/canvas.service';
import { tap } from 'rxjs';

class Node {
  public rowIndex: number = 0;
  public colIndex: number = 0;
  public id: string = '';
  public height: number = 0;
  public neighbors: Node[] = [];
  public previous: Node | null = null;
  public value: number = Infinity;
}

class Graph {
  public nodes: Map<string, Node> = new Map<string, Node>();
  public startNodeId: string = '';
  public endNodeId: string = '';
  public queue: string[] = [];
  public visited: Set<string> = new Set<string>();

  public traverseFromStart(): number {
    this.visited.clear();
    this.queue = [this.startNodeId];
    return this.traverse();
  }

  public traverseFromStartPart2(): number {
    this.visited.clear();
    this.queue = Array.from(this.nodes.values()).filter(n => n.height === 0).map(n => n.id);
    return this.traverse();
  }

  public traverse(currentStep: number = 0): number {
    const nextQueue: string[] = [];

    while (this.queue.length > 0) {
      const nodeId = this.queue.pop();
      if (nodeId === this.endNodeId) return currentStep;
      if (nodeId === undefined) throw new Error();
      if (this.visited.has(nodeId)) continue;
      this.visited.add(nodeId);
      const node = this.nodes.get(nodeId);
      if (node === undefined) throw new Error();
      for (const neighbor of node.neighbors) {
        if (!this.visited.has(neighbor.id)) {
          nextQueue.push(neighbor.id);
        }
      }
    }

    if (nextQueue.length) {
      this.queue = nextQueue;
      return this.traverse(currentStep+1);
    }

    throw new Error();
  }
}

@Component({
  selector: 'app-d12',
  template: ``,
})
export class D12Component implements AfterViewInit, OnDestroy {

  protected graph: Graph = new Graph();

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
    this.inputService.get('12').pipe(
      tap(() => {startTime = performance.now();}),
      tap(input => this.processInput(input)),
      tap(() => this.process()),
      tap(() => this.processPart2()),
      tap(() => {console.log(`Took ${performance.now() - startTime}ms`);}),
    ).subscribe();
  }

  protected processInput(input: string[]): void {
    const grid: Node[][] = [];
    for (let rowIndex = 0; rowIndex < input.length; rowIndex++) {
      const inputLine = input[rowIndex];
      if (inputLine === '') continue;

      grid.push([]);

      const letters = inputLine.split('');
      for (let colIndex = 0; colIndex < letters.length; colIndex++) {
        const node = new Node();
        node.id = this.getNodeId(rowIndex, colIndex);
        node.rowIndex = rowIndex;
        node.colIndex = colIndex;

        let letter = letters[colIndex];
        if (letter === 'S') {
          this.graph.startNodeId = node.id;
          letter = 'a';
        } else if (letter === 'E') {
          this.graph.endNodeId = node.id;
          letter = 'z';
        }

        node.height = letter.charCodeAt(0) - 97;

        grid[rowIndex].push(node);
      }
    }

    for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
      const row = grid[rowIndex];
      for (let colIndex = 0; colIndex < row.length; colIndex++) {
        const node = row[colIndex];
        const possibleNeighbors: Node[] = [];

        // Top
        if (rowIndex > 0) {
          possibleNeighbors.push(grid[rowIndex - 1][colIndex]);
        }

        // Bottom
        if (rowIndex < grid.length - 1) {
          possibleNeighbors.push(grid[rowIndex + 1][colIndex]);
        }

        // Right
        if (colIndex < row.length - 1) {
          possibleNeighbors.push(grid[rowIndex][colIndex + 1]);
        }

        // Left
        if (colIndex > 0) {
          possibleNeighbors.push(grid[rowIndex][colIndex - 1]);
        }

        node.neighbors.push(...possibleNeighbors.filter(n => n.height <= node.height + 1));
        this.graph.nodes.set(node.id, node);
      }
    }
  }

  protected process(): void {
    const result = this.graph.traverseFromStart();
    console.log('Part1', result);
  }

  protected processPart2(): void {
    const result = this.graph.traverseFromStartPart2();
    console.log('Part2', result);
  }

  protected getNodeId(rowIndex: number, colIndex: number): string {
    return `[${rowIndex}:${colIndex}]`;
  }
}
