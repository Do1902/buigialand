import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { loadAuth } from 'src/app/models/Admin/auth.actions';
import {
  selectAuthError,
  selectAuthLoading,
} from 'src/app/models/Admin/auth.selectors';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  loading$ = this.store.select(selectAuthLoading);
  error$ = this.store.select(selectAuthError);
  constructor(private store: Store<{ Authencation: any }>) {}
  ngOnInit(): void {
    this.store
      .select('Authencation')
      .pipe(take(1))
      .subscribe((initialState) => {
        if (!initialState['data']) {
          this.store.dispatch(loadAuth());
        }
      });
  }
}
