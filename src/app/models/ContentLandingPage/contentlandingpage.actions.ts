import { createAction, props } from '@ngrx/store';

export const loadContentLandingPage = createAction(
  '[Content] Load Content LandingPage'
);
export const loadContentLandingPageSuccess = createAction(
  '[Content] Load Content LandingPage Success',
  props<{ content: any }>()
);
export const loadContentLandingPageFailure = createAction(
  '[Content] Load Content LandingPage Failure',
  props<{ error: any }>()
);
