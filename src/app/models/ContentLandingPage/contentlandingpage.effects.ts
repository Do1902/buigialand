import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ContentLandingPageService } from './contentlandingpage.service';
import * as ContentLandingPageActions from './contentlandingpage.actions';

@Injectable()
export class ContentLandingPageEffects {
  loadContentLandingPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContentLandingPageActions.loadContentLandingPage),
      mergeMap(() =>
        this.ContentLandingPageService.getContentLandingPageState().pipe(
          map((content) =>
            ContentLandingPageActions.loadContentLandingPageSuccess({ content })
          ),
          catchError((error) =>
            of(
              ContentLandingPageActions.loadContentLandingPageFailure({ error })
            )
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private ContentLandingPageService: ContentLandingPageService
  ) {}
}
