import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import {
  delay,
  fromEvent, interval,
  map, merge,
  startWith,
  Subject,
  takeUntil,
  tap
} from 'rxjs';
import { CanvasService } from '../../core/canvas/canvas.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})
export class MainComponent implements OnDestroy, AfterViewInit {
  protected destroyed$: Subject<void> = new Subject<void>();

  public readonly resize$ = merge(
    fromEvent(window, 'resize'),
    interval(1000)
  ).pipe(
    takeUntil(this.destroyed$),
    startWith(null),
    map(() => [(window.innerWidth - 128), window.innerHeight - 128]),
    map(values => [...values, this.mainWrapper.nativeElement.clientWidth, this.mainWrapper.nativeElement.clientHeight]),
    map(values => Math.min(...values)),
    delay(1),
    tap(value => this.canvasService.updateCanvasSize(value)),
  );

  @ViewChild('mainWrapper')
  public mainWrapper!: ElementRef<HTMLDivElement>;

  constructor(
    protected canvasService: CanvasService,
  ) {
  }

  public ngAfterViewInit(): void {
    this.resize$.subscribe();
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
