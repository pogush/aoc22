import { Scene } from '../../../core/engine/scene';
import {
  CircleGeometry, Material,
  Mesh,
  MeshBasicMaterial,
  OrthographicCamera,
  PlaneGeometry
} from 'three';
import { FullRound, Outcome, Shape } from './data';
import { interval, of, takeUntil, tap, zip } from 'rxjs';
import { Geometry } from 'three/examples/jsm/deprecated/Geometry';
import { BufferGeometry } from 'three/src/core/BufferGeometry';

type WorldShape = {
  roundIndex: number;
  mesh: Mesh;
}

export class D02Scene extends Scene {
  protected camera!: OrthographicCamera;
  protected frustumSize = 1000;
  protected shapeSpeed = 250;

  protected rounds: FullRound[] = [];
  protected worldShapes: WorldShape[] = [];

  protected materialWhite = new MeshBasicMaterial({color: 0xe3e3e3});
  protected materialBlack = new MeshBasicMaterial({color: 0x1c2021});
  protected materialGreen = new MeshBasicMaterial({color: 0x276851});
  protected materialYellow = new MeshBasicMaterial({color: 0xe9cd67});
  protected materialRed = new MeshBasicMaterial({color: 0xcd3741});

  protected shapeOutcomeGeometry = new CircleGeometry(16, 16);
  protected shapeRockGeometry = new CircleGeometry(16, 6);
  protected shapePaperGeometry = new PlaneGeometry(28, 28);
  protected shapeScissorsGeometry = new CircleGeometry(16, 3);

  public override setup(): void {
    this.camera = new OrthographicCamera(
      this.frustumSize / -2,
      this.frustumSize / 2,
      this.frustumSize / 2,
      this.frustumSize / -2,
      0,
      10000,
    );
    this.camera.position.set(this.frustumSize / 2, this.frustumSize / 2, 1);
    this.add(this.camera);
    this.engineService.setMainCamera(this.camera);

    const lineGeometry = new PlaneGeometry(this.frustumSize, 2);
    const lineOpponent = new Mesh(lineGeometry, this.materialRed);
    lineOpponent.position.set(this.frustumSize / 2, 800, 0);
    this.add(lineOpponent);

    const linePart1Me = new Mesh(lineGeometry, this.materialGreen);
    linePart1Me.position.set(this.frustumSize / 2, 600, 0);
    this.add(linePart1Me);

    const linePart1Outcome = new Mesh(lineGeometry, this.materialWhite);
    linePart1Outcome.position.set(this.frustumSize / 2, 500, 0);
    this.add(linePart1Outcome);

    const linePart2Me = new Mesh(lineGeometry, this.materialGreen);
    linePart2Me.position.set(this.frustumSize / 2, 300, 0);
    this.add(linePart2Me);

    const linePart2Outcome = new Mesh(lineGeometry, this.materialWhite);
    linePart2Outcome.position.set(this.frustumSize / 2, 200, 0);
    this.add(linePart2Outcome);

    // const gridHelper = new GridHelper(this.frustumSize, 10);
    // gridHelper.rotation.x = MathUtils.degToRad(-90);
    // gridHelper.position.set(this.frustumSize / 2, this.frustumSize / 2, 0);
    // this.add(gridHelper);
    //
    // const axesHelper = new AxesHelper(240);
    // this.add(axesHelper);
  }

  public override start(): void {
    zip(of(...this.rounds), interval(500)).pipe(
      takeUntil(this.disposed$),
      tap(([round, index]) => this.manageRound(index, round)),
    ).subscribe();
  }

  public override update(): void {
    for (const worldShape of this.worldShapes) {
      worldShape.mesh.position.x -= this.shapeSpeed * this.deltaTime;
      if (worldShape.mesh.position.x < -100) {
        this.remove(worldShape.mesh);
      }
    }
  }

  public setRounds(rounds: FullRound[]): void {
    this.rounds = rounds;
  }

  protected manageRound(roundIndex: number, round: FullRound): void {
    const worldShapesIndex = this.worldShapes.findIndex(worldShape => worldShape.roundIndex === roundIndex);
    if (worldShapesIndex >= 0) return;

    // Opponent
    const circleOpponent = new Mesh(this.getGeometryForShape(round.part1.opponent), this.materialWhite);
    circleOpponent.position.set(this.frustumSize + 100, 800, 1);
    this.add(circleOpponent);

    // Part1 me
    const circlePart1Me = new Mesh(this.getGeometryForShape(round.part1.me), this.materialWhite);
    circlePart1Me.position.set(this.frustumSize + 100, 600, 1);
    this.add(circlePart1Me);

    // Part1 outcome
    const circlePart1Outcome = new Mesh(this.shapeOutcomeGeometry, this.getMaterialForOutcome(round.part1.outcome));
    circlePart1Outcome.position.set(this.frustumSize + 100, 500, 1);
    this.add(circlePart1Outcome);

    // Part2 me
    const circlePart2Me = new Mesh(this.getGeometryForShape(round.part2.me), this.materialWhite);
    circlePart2Me.position.set(this.frustumSize + 100, 300, 1);
    this.add(circlePart2Me);

    // Part2 outcome
    const circlePart2Outcome = new Mesh(this.shapeOutcomeGeometry, this.getMaterialForOutcome(round.part2.outcome));
    circlePart2Outcome.position.set(this.frustumSize + 100, 200, 1);
    this.add(circlePart2Outcome);

    this.worldShapes.push({
      mesh: circleOpponent,
      roundIndex: roundIndex,
    });
    this.worldShapes.push({
      mesh: circlePart1Me,
      roundIndex: roundIndex,
    });
    this.worldShapes.push({
      mesh: circlePart1Outcome,
      roundIndex: roundIndex,
    });
    this.worldShapes.push({
      mesh: circlePart2Me,
      roundIndex: roundIndex,
    });
    this.worldShapes.push({
      mesh: circlePart2Outcome,
      roundIndex: roundIndex,
    });
  }

  protected getGeometryForShape(shape: Shape): BufferGeometry {
    return shape === 'Rock' ? this.shapeRockGeometry : shape === 'Paper' ? this.shapePaperGeometry : this.shapeScissorsGeometry;
  }

  protected getMaterialForOutcome(outcome: Outcome): Material {
    return outcome === 'Win' ? this.materialGreen : outcome === 'Loss' ? this.materialRed : this.materialYellow;
  }
}
