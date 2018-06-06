import { Action } from '@ngrx/store';

import { LayoutActionTypes, LayoutActions } from '../actions/layout.actions';

export interface State {
    isShowSpinner: boolean;
    messageSpinner: string;
    isDarkTheme: boolean;
    language: string;
}

const initialState: State = {
    isShowSpinner: false,
    messageSpinner: '',
    isDarkTheme: false,
    language: 'en',
};

export function reducer(state = initialState, action: LayoutActions) {
    switch (action.type) {
        case LayoutActionTypes.SHOW_SPINNER:
            return {
                ...state,
                isShowSpinner: true,
                messageSpinner: action.payload
            };
        case LayoutActionTypes.HIDE_SPINNER:
            return {
                ...state,
                isShowSpinner: false
            };
        case LayoutActionTypes.UPDATE_SPINNER:
            return {
                ...state,
                messageSpinner: action.payload

            };
        case LayoutActionTypes.TOGGLE_THEME:
            return {
                ...state,
                isDarkTheme: !state.isDarkTheme
            };
        case LayoutActionTypes.SET_LANGUAGE:
            return {
                ...state,
                language: action.payload
            };
        default:
            return state;
    }
}

export const getIsShowSpinner = (state: State) => state.isShowSpinner;
export const getMessageSpinner = (state: State) => state.messageSpinner;
export const getIsDarkTheme = (state: State) => state.isDarkTheme;
export const getLanguage = (state: State) => state.language;
