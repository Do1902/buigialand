import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { SettingsService } from './settings.service';
import * as SettingsActions from './settings.actions';

@Injectable()
export class SettingsEffects {
  loadSettings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettingsActions.loadSettings),
      mergeMap(() =>
        this.settingsService.getSettings().pipe(
          map((settings) =>
            SettingsActions.loadSettingsSuccess({ settings })
          ),
          catchError((error) =>
            of(SettingsActions.loadSettingsFailure({ error }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private settingsService: SettingsService
  ) {}
}