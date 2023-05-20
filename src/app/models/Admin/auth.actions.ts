import { createAction, props } from '@ngrx/store';

export const loadAuth = createAction('[Auth] Load Auth');
export const loadAuthSuccess = createAction(
  '[Auth] Load Auth Success',
  props<{ auth: any }>()
);
export const loadAuthFailure = createAction(
  '[Auth] Load Settings Failure',
  props<{ error: any }>()
);
