import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as AuthActions from './auth.actions';
import { AuthService } from './auth.service';

@Injectable()
export class AuthEffects {
  loadAuth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loadAuth),
      mergeMap(() => {
        const token = localStorage.getItem('access_token') || null;
        let authObservable;
        if (token) {
          authObservable = this.authService.getAuth(token);
        } else {
          authObservable = this.authService.getAuth(null);
        }
        return this.authService.getAuth(token).pipe(
          map((auth) => AuthActions.loadAuthSuccess({ auth })),
          catchError((error) => of(AuthActions.loadAuthFailure({ error })))
        );
      })
    )
  );

  constructor(private actions$: Actions, private authService: AuthService) {}
}
