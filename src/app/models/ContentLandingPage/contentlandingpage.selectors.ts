import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  ContentLandingPageState,
  ContentLandingPageFeatureKey,
} from './contentlandingpage.reducer';

export const selectContentLandingPageState =
  createFeatureSelector<ContentLandingPageState>(ContentLandingPageFeatureKey);

export const selectContentLandingPageData = createSelector(
  selectContentLandingPageState,
  (state) => state.data
);

export const selectContentLandingLoading = createSelector(
  selectContentLandingPageState,
  (state) => state.loading
);
export const selectContentLandingError = createSelector(
  selectContentLandingPageState,
  (state) => state.error
);
