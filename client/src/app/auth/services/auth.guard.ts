import { CanActivate, CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot, Route } from '@angular/router';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

    constructor(private readonly store: Store<fromRoot.State>) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        console.log('canActivate', route);
        console.log('canActivate', state);
        return this.store.select(fromRoot.getIsAuthenticated).pipe(take(1));
    }

    canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
        console.log('canLoad');
        return this.store.select(fromRoot.getIsAuthenticated).pipe(take(1));
    }
}
