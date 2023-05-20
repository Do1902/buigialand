import { createReducer, on } from '@ngrx/store';
import * as ContentLandingPageStateActions from './contentlandingpage.actions';

export const ContentLandingPageFeatureKey = 'ContentLandingPage';

export interface ContentLandingPageState {
  data: any;
  loading: boolean;
  error: any;
}

export const initialState: ContentLandingPageState = {
  data: null,
  loading: false,
  error: null,
};

export const ContentLandingPageStateReducer = createReducer(
  initialState,
  on(ContentLandingPageStateActions.loadContentLandingPage, (state) => ({
    ...state,
    loading: true,
  })),
  on(
    ContentLandingPageStateActions.loadContentLandingPageSuccess,
    (state, { content }) => ({
      ...state,
      loading: false,
      data: content,
    })
  ),
  on(
    ContentLandingPageStateActions.loadContentLandingPageFailure,
    (state, { error }) => ({
      ...state,
      loading: false,
      error: error,
    })
  )
);
