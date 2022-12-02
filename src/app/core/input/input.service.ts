import { Injectable } from '@angular/core';
import { Day } from '../days/day.type';
import { Part } from '../days/part.type';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PlatformLocation } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class InputService {

  constructor(
    protected httpClient: HttpClient,
    protected platformLocation: PlatformLocation,
  ) {}

  public get(day: Day, part: Part, example: boolean = false): Observable<string[]> {
    return this.httpClient.get(
      this.getInputUrl(day, part, example),
      {
        responseType: 'text'
      },
    ).pipe(
      map(input => input.split(/\r?\n/)),
    );
  }

  protected getInputUrl(day: Day, part: Part, example: boolean = false): string {
    let exampleExt = example ? '.example' : '';
    return `${this.platformLocation.getBaseHrefFromDOM()}assets/input/d${day}p${part}${exampleExt}.txt`;
  }
}
