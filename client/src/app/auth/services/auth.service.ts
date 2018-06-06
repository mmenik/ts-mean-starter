import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

import { Observable, Subscription, interval, of, throwError, pipe } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { LayoutService } from '../../core/services/layout.service';
import { Account } from '../models/account.model';

import { Store } from '@ngrx/store';
import { AuthActionTypes, Login, Logout, Renew } from '../store/actions/auth.actions';
import { LayoutActionTypes, HideSpinner, UpdateSpinner, ShowSpinner } from '../../core/store/actions/layout.actions';
import * as fromRoot from '../../app.reducer';
import { apiPath } from '../../api.path';


@Injectable()
export class AuthService {
  private readonly interval$: Observable<any> = interval(1000);
  private subscription: Subscription;

  constructor(private readonly http: HttpClient,
    private readonly jwtHelper: JwtHelperService,
    private readonly router: Router,
    private readonly layoutService: LayoutService,
    private readonly store: Store<fromRoot.State>) { }

  private start() {
    this.subscription = this.interval$.subscribe(() => {
      if (this.token) {
        if (this.jwtHelper.isTokenExpired(this.token)) {
          this.logout();
          this.layoutService.showSnackbar('Automatic logout', null, 2000);
        }
      }
    });
  }

  private stop() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  init() {
    localStorage.clear();
    this.store.select(fromRoot.getIsAuthenticated).subscribe(
      authed => {
        if (authed) {
          console.log('Route Home');
          this.router.navigate(['/home']);
        } else {
          console.log('Route Login');
          this.router.navigate(['/login']);
        }
      });
  }

  login(account: Account): Observable<any> {
    this.store.dispatch(new ShowSpinner('Authentication...'));
    console.log(account);
    return this.http.post(apiPath(1, 'auth'), account)
      .pipe(
        map((data: any) => {
          localStorage.setItem('access_token', data.token);
          this.store.dispatch(new Login({
            username: data.username,
            tokenExpirationDate: this.jwtHelper.getTokenExpirationDate(this.token)
          }));
          this.store.dispatch(new HideSpinner());
          this.start();

          this.layoutService.showSnackbar('Authenticated', null, 2000);
          return data;
        }),
        catchError((err: HttpErrorResponse) => {
          this.store.dispatch(new Logout());
          this.store.dispatch(new HideSpinner());

          this.layoutService.showSnackbar(err.error.message, null, 2000);
          return Observable.throw(err);
        })
      );
  }

  renew() {
    this.http.get(apiPath(1, 'auth/renew'))
      .pipe(
        map((data: any) => {
          localStorage.setItem('access_token', data.token);
          this.store.dispatch(new Renew(this.jwtHelper.getTokenExpirationDate(this.token)));
        }),
        catchError((err: HttpErrorResponse) => throwError(err))
      )
      .subscribe();
  }

  logout() {
    console.log('Logout');
    this.store.dispatch(new Logout());
    localStorage.clear();
    this.stop();
  }

  get token(): string {
    return localStorage.getItem('access_token');
  }

}
