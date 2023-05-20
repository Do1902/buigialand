import { createAction, props } from '@ngrx/store';

export const loadSettings = createAction('[Settings] Load Settings');
export const loadSettingsSuccess = createAction(
  '[Settings] Load Settings Success',
  props<{ settings: any }>()
);
export const loadSettingsFailure = createAction(
  '[Settings] Load Settings Failure',
  props<{ error: any }>()
);
