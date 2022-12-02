import { ElementRef, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CanvasService {

  protected canvasElement: ElementRef<HTMLCanvasElement> | null = null;

  public canvasSize$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  public setCanvas(canvas: ElementRef<HTMLCanvasElement>): void {
    this.canvasElement = canvas;
  }

  public get canvas(): ElementRef<HTMLCanvasElement> | null {
    return this.canvasElement;
  }

  public updateCanvasSize(size: number): void {
    if (this.canvasElement !== null) {
      this.canvasElement.nativeElement.width = size;
      this.canvasElement.nativeElement.height = size;
    }
    this.canvasSize$.next(size);
  }
}
