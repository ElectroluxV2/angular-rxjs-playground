import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  filter,
  ReplaySubject,
  Subject,
  withLatestFrom,
} from 'rxjs';

@Component({
  selector: 'main-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  private lastResults = 0;
  protected readonly results$ = new BehaviorSubject<number>(0);

  protected readonly agGridApi$ = new BehaviorSubject<boolean>(false);
  private readonly usableAgGridApi$ = this.agGridApi$.pipe(
    filter((x) => x === true)
  );

  protected logs: string[] = [];

  public constructor() {
    combineLatest([
      this.results$,
      this.agGridApi$.pipe(filter((x) => x === true)),
    ]).subscribe(([a, b]) => {
      this.log(`Combine latest results: ${a}, api avaliable: ${b}`);
    });

    // this.results$
    //   .pipe(withLatestFrom(this.usableAgGridApi$))
    //   .subscribe(([a, b]) => {
    //     this.log(`With latest a: ${a}, b: ${b}`);
    //   });
  }

  protected nextResults(): void {
    this.results$.next(++this.lastResults);
  }

  protected nextApiInitial(): void {
    this.agGridApi$.next(true);
  }

  protected nextApiDestroy(): void {
    this.agGridApi$.next(false);
  }

  protected log(message: string): void {
    this.logs = this.logs.concat(message);
  }
}
