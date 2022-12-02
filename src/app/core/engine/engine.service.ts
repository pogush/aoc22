import { Injectable, OnDestroy } from '@angular/core';
import { Camera, Color, Vector2, WebGLRenderer } from 'three';
import { Scene } from './scene';
import { CanvasService } from '../canvas/canvas.service';
import { Subject, takeUntil, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EngineService implements OnDestroy {
  protected destroyed$: Subject<void> = new Subject<void>();

  protected rendererInternal: WebGLRenderer | null = null;
  protected scene: Scene | null = null;
  protected mainCamera: Camera | null = null;

  protected running: boolean = false;
  protected animationFrameRequestID: number = 0;
  protected lastTime: DOMHighResTimeStamp = 0;
  protected sizeInternal: number = 0;

  constructor(
    protected canvasService: CanvasService,
  ) {
    this.canvasService.canvasSize$.pipe(
      takeUntil(this.destroyed$),
      tap(size => this.onCanvasSizeUpdate(size)),
    ).subscribe();
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  public setScene(scene: Scene): void {
    if (this.running) return;

    this.scene = scene;
    this.scene.background = new Color(0x212527);
    this.scene.setup();
  }

  public setMainCamera(camera: Camera): void {
    if (this.running) return;

    this.mainCamera = camera;
  }

  public bootstrap(): void {
    if (this.running) return;
    if (this.scene === null) return;
    if (this.mainCamera === null) return;
    if (this.canvasService.canvas === null) return;

    this.animationFrameRequestID = 0;
    this.lastTime = 0;

    this.rendererInternal = new WebGLRenderer({
      canvas: this.canvasService.canvas.nativeElement,
      alpha: false,
    });

    this.start();
  }

  public interrupt(): void {
    if (!this.running) return;
    if (!this.scene) return;
    if (!this.rendererInternal) return;

    this.stop();

    this.scene.dispose();
    this.rendererInternal.dispose();
    this.rendererInternal.renderLists.dispose();

    this.scene = null;
    this.rendererInternal = null;
    this.mainCamera = null;
  }

  public get renderer(): WebGLRenderer {
    if (this.rendererInternal === null) throw Error();
    return this.rendererInternal;
  }

  public get size(): number {
    return this.sizeInternal;
  }

  protected start(): void {
    if (this.running) return;
    if (this.scene === null) return;
    if (this.mainCamera === null) return;
    if (this.rendererInternal === null) return;

    this.running = true;

    this.scene.start();
    this.update(window.performance.now());
  }

  protected stop(): void {
    this.running = false;
    cancelAnimationFrame(this.animationFrameRequestID);
  }

  protected update(time: DOMHighResTimeStamp): void {
    if (!this.running) return;
    if (this.scene === null) return;

    const delta = this.getDeltaTime(time);
    this.lastTime = time;
    this.scene.setDeltaTime(delta / 1000);
    this.scene.update();

    this.render();
    this.animationFrameRequestID = requestAnimationFrame((time) => this.update(time));
  }

  protected render(): void {
    if (!this.running) return;
    if (this.rendererInternal === null) return;
    if (this.scene === null) return;
    if (this.mainCamera === null) return;

    this.rendererInternal.render(this.scene, this.mainCamera);
  }

  protected getDeltaTime(time: DOMHighResTimeStamp): number {
    return this.lastTime === 0 ? 0 : time - this.lastTime;
  }

  protected onCanvasSizeUpdate(size: number): void {
    this.sizeInternal = size;

    if (!this.running) return;
    if (this.rendererInternal === null) return;
    if (this.mainCamera === null) return;

    const currentSize = new Vector2();
    this.rendererInternal.getSize(currentSize)

    if (currentSize.x === size && currentSize.y === size) return;

    this.rendererInternal.setSize(size, size);
  }
}
