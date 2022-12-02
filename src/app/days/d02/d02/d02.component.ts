import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { InputService } from '../../../core/input/input.service';
import { EngineService } from '../../../core/engine/engine.service';
import { CanvasService } from '../../../core/canvas/canvas.service';
import { tap } from 'rxjs';
import { D02Scene } from './d02.scene';
import {
  MyShapeInput,
  OpponentShapeInput,
  OutcomeInput,
  OUTCOME_SCORE_MAP,
  SHAPE_SCORE_MAP,
  OPPONENT_SHAPE_CONVERSION_MAP,
  MY_SHAPE_CONVERSION_MAP,
  OUTCOME_CONVERSION_MAP,
  Round,
  SHAPE_TO_OUTCOME_MAP,
  OUTCOME_TO_SHAPE_MAP, FullRound
} from './data';

@Component({
  selector: 'app-d02',
  template: ``,
})
export class D02Component implements AfterViewInit, OnDestroy  {

  protected rounds: FullRound[] = [];

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
    this.inputService.get('02', '1').pipe(
      tap(input => this.process(input)),
      tap(() => this.bootstrap()),
    ).subscribe();
  }

  protected process(input: string[]): void {
    let part1TotalScore = 0;
    let part2TotalScore = 0;

    const rounds: FullRound[] = [];

    for (const round of input) {
      if (round === '') continue;
      const shapes = round.split('');
      const opponentShapeInput = shapes[0] as OpponentShapeInput;
      const myShapeInput = shapes[2] as MyShapeInput;
      const outcomeInput = shapes[2] as OutcomeInput;

      const opponentShape = OPPONENT_SHAPE_CONVERSION_MAP[opponentShapeInput];
      const part1Shape = MY_SHAPE_CONVERSION_MAP[myShapeInput];
      const part2Outcome = OUTCOME_CONVERSION_MAP[outcomeInput];

      const part1Outcome = SHAPE_TO_OUTCOME_MAP[opponentShape][part1Shape];
      const part2Shape = OUTCOME_TO_SHAPE_MAP[opponentShape][part2Outcome];

      const part1round: Round = {
        opponent: opponentShape,
        me: part1Shape,
        outcome: part1Outcome,
        points: SHAPE_SCORE_MAP[part1Shape] + OUTCOME_SCORE_MAP[part1Outcome],
      };

      const part2round: Round = {
        opponent: opponentShape,
        me: part2Shape,
        outcome: part2Outcome,
        points: SHAPE_SCORE_MAP[part2Shape] + OUTCOME_SCORE_MAP[part2Outcome],
      };

      part1TotalScore += part1round.points;
      part2TotalScore += part2round.points;

      rounds.push({
        part1: part1round,
        part2: part2round,
      });
    }

    this.rounds = rounds
      .map(round => ({v: round, r: Math.random()}))
      .sort((a, b) => a.r - b.r)
      .map(({v}) => v);

    const resultPart1 = part1TotalScore;
    const resultPart2 = part2TotalScore;
    console.log('Part1', resultPart1);
    console.log('Part2', resultPart2);
  }

  protected bootstrap(): void {
    if (this.canvasService.canvas !== null) {
      const scene = new D02Scene(this.engineService)
      scene.setRounds(this.rounds);
      this.engineService.setScene(scene);
      this.engineService.bootstrap();
    }
  }
}
