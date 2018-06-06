import { Component, OnChanges, Input, OnInit, OnDestroy, SimpleChanges } from '@angular/core';
import { Observable, Subscription, interval } from 'rxjs';

import * as moment from 'moment';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss']
})
export class DateComponent implements OnInit, OnChanges, OnDestroy {
  @Input() language: string;
  @Input() value: string;
  public date: string;

  private readonly interval$: Observable<any> = interval(1000);
  private subscription: Subscription;

  constructor() { }

  ngOnInit() {
    moment.locale(this.language);
    if (!this.value) {
      this.date = moment().format('DD-MM-YYYY HH:mm:ss');
      this.subscription = this.interval$.subscribe(() => {
        this.date = moment().format('DD-MM-YYYY HH:mm:ss');
      });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.value) {
      this.date = moment(new Date(this.value)).format('DD-MM-YYYY HH:mm:ss');
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
