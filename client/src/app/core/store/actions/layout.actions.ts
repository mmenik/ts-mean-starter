import { Action } from '@ngrx/store';

export enum LayoutActionTypes {
  SHOW_SPINNER = '[Layout] Show Spinner',
  HIDE_SPINNER = '[Layout] Hide Spinner',
  UPDATE_SPINNER = '[Layout] Update Spinner',
  TOGGLE_THEME = '[Layout] Toggle Theme',
  SET_LANGUAGE = '[Layout] Set Language',
  INIT_APP = '[Layout] Init App',
}

export class ShowSpinner implements Action {
  readonly type = LayoutActionTypes.SHOW_SPINNER;

  constructor(public payload: string) { }
}

export class HideSpinner implements Action {
  readonly type = LayoutActionTypes.HIDE_SPINNER;
}

export class UpdateSpinner implements Action {
  readonly type = LayoutActionTypes.UPDATE_SPINNER;

  constructor(public payload: string) { }
}

export class ToggleTheme implements Action {
  readonly type = LayoutActionTypes.TOGGLE_THEME;
}

export class SetLanguage implements Action {
  readonly type = LayoutActionTypes.SET_LANGUAGE;

  constructor(public payload: string) { }
}

export class InitApp implements Action {
  readonly type = LayoutActionTypes.INIT_APP;
}

export type LayoutActions =
  ShowSpinner |
  HideSpinner |
  UpdateSpinner |
  ToggleTheme |
  SetLanguage |
  InitApp;
