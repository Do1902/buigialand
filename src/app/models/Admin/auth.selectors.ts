import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState, AuthFeatureKey } from './auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>(AuthFeatureKey);

export const selectAuthData = createSelector(
  selectAuthState,
  (state) => state.data
);

export const selectAuthLoading = createSelector(
  selectAuthState,
  (state) => state.loading
);
export const selectAuthError = createSelector(
  selectAuthState,
  (state) => state.error
);
