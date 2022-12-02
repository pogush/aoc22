/**
 * A: rock
 * B: paper
 * C: scissors
 *
 * X: rock 1 point
 * Y: paper 2 points
 * Z: scissors 3 points
 *
 * X: lose 0 points
 * Y: draw 3 points
 * Z: win 6 points
 */

export type Shape = 'Rock' | 'Paper' | 'Scissors';
export type Outcome = 'Win' | 'Draw' | 'Loss';
export type OpponentShapeInput = 'A' | 'B' | 'C';
export type MyShapeInput = 'X' | 'Y' | 'Z';
export type OutcomeInput = MyShapeInput;
export type OpponentShapeConversionMap = {
  [key in OpponentShapeInput]: Shape;
};
export type MyShapeConversionMap = {
  [key in MyShapeInput]: Shape;
};
export type OutcomeConversionMap = {
  [key in OutcomeInput]: Outcome;
};
export type ShapeToOutcomeMap = {
  [key in Shape]: {
    [key in Shape]: Outcome;
  };
};
export type OutcomeToShapeMap = {
  [key in Shape]: {
    [key in Outcome]: Shape;
  };
};
export type ShapeScoreMap = {
  [key in Shape]: number;
};
export type OutcomeScoreMap = {
  [key in Outcome]: number;
};

export type Round = {
  opponent: Shape;
  me: Shape;
  outcome: Outcome;
  points: number;
}
export type FullRound = {
  part1: Round;
  part2: Round;
};

export const ROCK_SCORE = 1;
export const PAPER_SCORE = 2;
export const SCISSORS_SCORE = 3;

export const LOSS_SCORE = 0;
export const DRAW_SCORE = 3;
export const WIN_SCORE = 6;

export const OPPONENT_SHAPE_CONVERSION_MAP: OpponentShapeConversionMap = {
  A: 'Rock',
  B: 'Paper',
  C: 'Scissors',
};
export const MY_SHAPE_CONVERSION_MAP: MyShapeConversionMap = {
  X: 'Rock',
  Y: 'Paper',
  Z: 'Scissors',
};
export const OUTCOME_CONVERSION_MAP: OutcomeConversionMap = {
  X: 'Loss',
  Y: 'Draw',
  Z: 'Win',
};

export const SHAPE_TO_OUTCOME_MAP: ShapeToOutcomeMap = {
  Rock: {
    Rock: 'Draw',
    Paper: 'Win',
    Scissors: 'Loss',
  },
  Paper: {
    Rock: 'Loss',
    Paper: 'Draw',
    Scissors: 'Win',
  },
  Scissors: {
    Rock: 'Win',
    Paper: 'Loss',
    Scissors: 'Draw',
  },
};
export const OUTCOME_TO_SHAPE_MAP: OutcomeToShapeMap = {
  Rock: {
    Loss: 'Scissors',
    Draw: 'Rock',
    Win: 'Paper',
  },
  Paper: {
    Loss: 'Rock',
    Draw: 'Paper',
    Win: 'Scissors',
  },
  Scissors: {
    Loss: 'Paper',
    Draw: 'Scissors',
    Win: 'Rock',
  },
};

export const SHAPE_SCORE_MAP: ShapeScoreMap = {
  Rock: ROCK_SCORE,
  Paper: PAPER_SCORE,
  Scissors: SCISSORS_SCORE,
};
export const OUTCOME_SCORE_MAP: OutcomeScoreMap = {
  Loss: LOSS_SCORE,
  Draw: DRAW_SCORE,
  Win: WIN_SCORE,
};
