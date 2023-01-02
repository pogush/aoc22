import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { InputService } from '../../../core/input/input.service';
import { EngineService } from '../../../core/engine/engine.service';
import { CanvasService } from '../../../core/canvas/canvas.service';
import { tap } from 'rxjs';

const PIECES_ORDER = ['-', '+', 'L', 'I', 'o'] as const;

const PIECES = [
  [
    '####',
  ],
  [
    '.#.',
    '###',
    '.#.',
  ],
  [
    '..#',
    '..#',
    '###',
  ],
  [
    '#',
    '#',
    '#',
    '#',
  ],
  [
    '##',
    '##',
  ],
];

type PieceType = typeof PIECES_ORDER[number];

class Coordinate {
  constructor(
    public x: number,
    public y: number,
  ) {
  }

  public toString(): string {
    return `[${this.x}:${this.y}]`;
  }
}


class Piece {
  public blocks: Coordinate[] = [];

  constructor(
    public type: PieceType,
  ) {
  }
}

type Direction = 'right' | 'left' | 'down';

@Component({
  selector: 'app-d17',
  template: ``,
})
export class D17Component implements AfterViewInit, OnDestroy {
  protected movements: Direction[] = [];
  protected pieces: Piece[] = [];
  protected lines: Map<number, Set<number>> = new Map<number, Set<number>>();
  protected floor: number = -1;
  protected highestY: number = -1;

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
    this.inputService.get('17').pipe(
      tap(() => {
        startTime = performance.now();
      }),
      tap(() => this.processPieces(PIECES)),
      tap(input => this.processInput(input)),
      tap(() => this.process(2022)),
      tap(() => this.process(1000000)),
      tap(() => {
        console.log(`Took ${performance.now() - startTime}ms`);
      }),
    ).subscribe();
  }

  protected processPieces(piecesInput: string[][]): void {
    for (let i = 0; i < piecesInput.length; i++) {
      const pieceInput = piecesInput[i].reverse();
      const pieceType: PieceType = PIECES_ORDER[i];
      const piece = new Piece(pieceType);

      for (let y = 0; y < pieceInput.length; y++) {
        const pieceInputLine = pieceInput[y].split('');

        for (let x = 0; x < pieceInputLine.length; x++) {
          const pieceBlock = pieceInputLine[x];
          if (pieceBlock === '.') continue;

          piece.blocks.push(new Coordinate(x, y));
        }
      }

      this.pieces.push(piece);
    }
  }

  protected processInput(input: string[]): void {
    for (const inputLine of input) {
      if (inputLine === '') continue;
        this.movements = inputLine.split('').map(m => m === '>' ? 'right' : 'left');
    }
  }

  protected process(iterations: number): void {
    let movementIndex = 0;
    let pieceIndex = 0;
    const patterns: [number, number, number][] = [];
    for (let i = 0; i < iterations; i++) {
      if (i % 1000000 === 0) {
        console.log(i);
      }
      // get piece
      const piece = this.pieces[pieceIndex++];
      if (pieceIndex >= this.pieces.length) {
        pieceIndex = 0;
      }

      // find spawn position
      let x = 2;
      let y = this.highestY + 4;

      // fall
      while (true) {
        const movement: Direction = this.movements[movementIndex++];
        if (movementIndex >= this.movements.length) {
          movementIndex = 0;
        }

        if (this.canMove(x, y, piece, movement)) {
          x += movement === 'right' ? 1 : -1;
        }

        if (this.canMove(x, y, piece, 'down')) {
          y -= 1;
        } else {
          break;
        }
      }

      // add blocks
      let patternFound = false;
      for (const block of piece.blocks) {
        const blockX = x + block.x;
        const blockY = y + block.y;

        if (blockY <= this.floor) continue;

        if (!this.lines.has(blockY)) {
          this.lines.set(blockY, new Set<number>());
        }

        const line = this.lines.get(blockY);
        if (line === undefined) throw new Error();
        line.add(blockX);
        if (blockY > this.highestY) {
          this.highestY = blockY;
        }

        if (line.size === 7) {
          this.floor = blockY;
          //console.log('new floor at', this.floor, movementIndex, pieceIndex);

          for (const lineY of this.lines.keys()) {
            if (lineY <= this.floor) {
              this.lines.delete(lineY);
            }
          }

          if (patternFound) continue;

          const pattern = patterns.find(p => p[0] === movementIndex && p[1] === pieceIndex);
          if (pattern !== undefined) {
            patternFound = true;
            console.log('pattern found', pattern);
            console.log('current i', i);
            console.log('length', i - pattern[2]);
          } else {
            patterns.push([movementIndex, pieceIndex, i]);
          }
        }
      }

      if (patternFound) break;
    }

    console.log(this.highestY + 1);
  }

  protected canMove(x: number, y: number, piece: Piece, movement: Direction): boolean {
    const xDiff = movement === 'right' ? 1 : movement === 'left' ? -1 : 0;
    const yDiff = movement === 'down' ? -1 : 0;

    for (const block of piece.blocks) {
      const coordinate = new Coordinate(x + block.x + xDiff, y + block.y + yDiff);
      if (coordinate.x >= 7) return false;
      if (coordinate.x < 0) return false;
      if (coordinate.y <= this.floor) return false;

      if (this.lines.has(coordinate.y)) {
        const line = this.lines.get(coordinate.y);
        if (line === undefined) throw new Error();
        if (line.has(coordinate.x)) return false;
      }
    }

    return true;
  }
}
