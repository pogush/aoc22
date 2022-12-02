import { Mesh, Scene as ThreeScene } from 'three';
import { EngineService } from './engine.service';
import { Subject } from 'rxjs';

export class Scene extends ThreeScene {
  protected disposed$: Subject<void> = new Subject<void>();
  protected deltaTime: number = 0;

  constructor(
    protected engineService: EngineService
  ) {
    super();
  }

  public setup(): void {}
  public start(): void {}
  public update(): void {}
  public dispose(): void {
    this.traverse(o => {
      if (o instanceof Mesh) {
        if (o.geometry) {
          o.geometry.dispose();
        }
        if (o.material) {
          if (Array.isArray(o.material)) {
            for (const material of o.material) {
              material.dispose();
            }
          } else {
            o.material.dispose();
          }
        }
      }
    });
    this.disposed$.next();
    this.disposed$.complete();
  }

  public setDeltaTime(deltaTime: number): void {
    this.deltaTime = deltaTime;
  }
}
