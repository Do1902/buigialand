import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SettingsState, settingsFeatureKey } from './settings.reducer';

export const selectSettingsState = createFeatureSelector<SettingsState>(
  settingsFeatureKey
);

export const selectSettingsData = createSelector(
  selectSettingsState,
  state => state.data
);

export const selectSettingsLoading = createSelector(
  selectSettingsState,
  state => state.loading
);
export const selectSettingsError = createSelector(
  selectSettingsState,
  state => state.error
);
