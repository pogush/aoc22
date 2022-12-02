import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CanvasService } from '../../core/canvas/canvas.service';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.sass']
})
export class DayComponent implements AfterViewInit {

  public canvasSize$ = this.canvasService.canvasSize$;

  @ViewChild('canvas')
  public canvas!: ElementRef<HTMLCanvasElement>

  constructor(
    protected canvasService: CanvasService,
  ) {
  }

  public ngAfterViewInit(): void {
    this.canvasService.setCanvas(this.canvas);
  }
}
