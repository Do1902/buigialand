import { createReducer, on } from '@ngrx/store';
import * as SettingsActions from './settings.actions';

export const settingsFeatureKey = 'settings';

export interface SettingsState {
  data: any;
  loading: boolean;
  error: any;
}

export const initialState: SettingsState = {
  data: null,
  loading: false,
  error: null,
};

export const settingsReducer = createReducer(
  initialState,
  on(SettingsActions.loadSettings, (state) => ({
    ...state,
    loading: true,
  })),
  on(SettingsActions.loadSettingsSuccess, (state, { settings }) => ({
    ...state,
    loading: false,
    data: settings,
  })),
  on(SettingsActions.loadSettingsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  }))
);
