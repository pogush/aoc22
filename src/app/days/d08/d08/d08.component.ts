import {AfterViewInit, Component, OnDestroy} from '@angular/core';
import {tap} from "rxjs";
import {InputService} from "../../../core/input/input.service";
import {EngineService} from "../../../core/engine/engine.service";
import {CanvasService} from "../../../core/canvas/canvas.service";

class Tree {
  constructor(
    public height: number = 0,
    public visible: boolean = false,
    public visibleFromRow: boolean = false,
    public visibleFromCol: boolean = false,
    public score: number = 0,
  ) {}
}

class Patch {
  public trees: Tree[][] = [];

  calculateVisibilityForRow(rowIndex: number, reverse: boolean = false): void {
    let maxHeight = -1;
    let trees = [...this.trees[rowIndex]];
    if (reverse) trees.reverse();
    for (const tree of trees) {
      if (reverse && tree.visibleFromRow) return;
      if (tree.height > maxHeight) {
        maxHeight = tree.height;
        tree.visible = true;
        tree.visibleFromRow = true;
        if (tree.height === 9) return;
      }
    }
  }

  calculateVisibilityForCol(colIndex: number, reverse: boolean = false): void {
    let maxHeight = -1;
    let trees = this.trees.map(row => row[colIndex]);
    if (reverse) trees.reverse();
    for (const tree of trees) {
      if (reverse && tree.visibleFromCol) return;
      if (tree.height > maxHeight) {
        maxHeight = tree.height;
        tree.visible = true;
        tree.visibleFromCol = true;
        if (tree.height === 9) return;
      }
    }
  }

  getVisibility(): number {
    for (let rowIndex = 0; rowIndex < this.trees.length; rowIndex++) {
      this.calculateVisibilityForRow(rowIndex);
      this.calculateVisibilityForRow(rowIndex, true);
    }
    for (let colIndex = 0; colIndex < this.trees[0].length; colIndex++) {
      this.calculateVisibilityForCol(colIndex);
      this.calculateVisibilityForCol(colIndex, true);
    }

    return this.trees.reduce((visibility, row) => visibility + row.filter(t => t.visible).length , 0);
  }

  getScoreForTree(rowIndex: number, colIndex: number): number {
    let tree = this.trees[rowIndex][colIndex];
    let e = 0;
    let w = 0;
    let s = 0;
    let n = 0;

    // East
    for (let i = colIndex + 1; i < this.trees[rowIndex].length; i++) {
      e++;
      if (this.trees[rowIndex][i].height >= tree.height) break;
    }
    if (e === 0) return 0;

    // West
    for (let i = colIndex - 1; i >= 0; i--) {
      w++;
      if (this.trees[rowIndex][i].height >= tree.height) break;
    }
    if (w === 0) return 0;

    // South
    for (let i = rowIndex + 1; i < this.trees.length; i++) {
      s++;
      if (this.trees[i][colIndex].height >= tree.height) break;
    }
    if (s === 0) return 0;

    // North
    for (let i = rowIndex - 1; i >= 0; i--) {
      n++;
      if (this.trees[i][colIndex].height >= tree.height) break;
    }
    if (n === 0) return 0;

    return n * e * s * w;
  }

  getScore(): number {
    let bestScore = 0;
    this.trees.forEach((row, rowIndex) => row.forEach((tree, colIndex) => {
      const score = this.getScoreForTree(rowIndex, colIndex);
      if (score > bestScore) {
        bestScore = score;
      }
    }));

    return bestScore;
  }
}

@Component({
  selector: 'app-d08',
  template: ``,
})
export class D08Component implements AfterViewInit, OnDestroy {

  protected patch: Patch = new Patch();

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
    this.inputService.get('08').pipe(
      tap(() => {startTime = performance.now();}),
      tap(input => this.processInput(input)),
      tap(() => this.processPart1()),
      tap(() => this.processPart2()),
      tap(() => {console.log(`Took ${performance.now() - startTime}ms`);}),
    ).subscribe();
  }

  protected processInput(input: string[]): void {
    const rowMax = input.length - 1;
    const colMax = input[0].length - 1;
    input.forEach((inputLine, rowIndex) => {
      if (inputLine === '') return;
      this.patch.trees[rowIndex] = [];
      inputLine.split('').forEach((h, colIndex) => {
        const tree = new Tree(
          parseInt(h),
          rowIndex === 0 || rowIndex === rowMax || colIndex == 0 || colIndex == colMax,
          colIndex == 0,
          rowIndex == 0,
        );
        this.patch.trees[rowIndex].push(tree);
      });
    });
  }

  protected processPart1(): void {
    console.log('Part1', this.patch.getVisibility());
  }

  protected processPart2(): void {
    console.log('Part2', this.patch.getScore());
  }
}
