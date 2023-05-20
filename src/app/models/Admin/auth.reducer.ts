import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export const AuthFeatureKey = 'Authencation';

export interface AuthState {
  data: any;
  loading: boolean;
  error: any;
}

export const initialState: AuthState = {
  data: null,
  loading: false,
  error: null,
};

export const AuthReducer = createReducer(
  initialState,
  on(AuthActions.loadAuth, (state) => ({
    ...state,
    loading: true,
  })),
  on(AuthActions.loadAuthSuccess, (state, { auth }) => ({
    ...state,
    loading: false,
    data: auth,
  })),
  on(AuthActions.loadAuthFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  }))
);
