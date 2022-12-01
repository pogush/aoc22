import { Injectable } from '@angular/core';
import { Day } from '../days/day.type';
import { Part } from '../days/part.type';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class InputService {

  constructor(
    protected httpClient: HttpClient,
  ) {}

  public get(day: Day, part: Part): Observable<string[]> {
    return this.httpClient.get(
      this.getInputUrl(day, part),
      {
        responseType: 'text'
      },
    ).pipe(
      map(input => input.split('\n')),
    );
  }

  protected getInputUrl(day: Day, part: Part): string {
    return `/assets/input/d${day}p${part}.txt`;
  }
}
