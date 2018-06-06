import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { LayoutActionTypes, SetLanguage, ToggleTheme } from '../actions/layout.actions';
import { mergeMap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { apiPath } from '../../../api.path';
import { Config } from '../../../config/models/config.model';

@Injectable()
export class LayoutEffects {

    constructor(private http: HttpClient, private readonly actions$: Actions) { }

    @Effect()
    init$: Observable<Action> = this.actions$.pipe(
        ofType(LayoutActionTypes.INIT_APP),
        mergeMap(() =>
            this.http.get(apiPath(1, 'config')).pipe(
                mergeMap((data: Config) => {
                    console.log(data);
                    return [new SetLanguage(data.language), new ToggleTheme()];
                })
            )
        )
    );
}
