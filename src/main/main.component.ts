import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BehaviorSubject, combineLatest, filter, ReplaySubject } from 'rxjs';

@Component({
  selector: 'main-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  private lastResults = 0;
  protected readonly results$ = new ReplaySubject<number>(1);

  private lastApi = 0;
  protected readonly agGridApi$ = new BehaviorSubject<number | false>(false);

  protected logs: string[] = [];

  public constructor() {
    combineLatest([this.results$, this.agGridApi$])
      .pipe(filter(([r, a]) => a !== false))
      .subscribe(([r, a]) => {
        this.log(`Combine latest results: ${r}, api avaliable: ${a}`);
      });
  }

  protected nextResults(): void {
    this.results$.next(++this.lastResults);
  }

  protected nextApiNext(): void {
    this.agGridApi$.next(++this.lastApi);
  }

  protected nextApiDestroy(): void {
    this.agGridApi$.next(false);
  }

  protected log(message: string): void {
    this.logs = this.logs.concat(message);
  }
}
