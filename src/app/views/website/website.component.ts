import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { loadSettings } from 'src/app/models/Settings/settings.actions';
import {
  selectSettingsLoading,
  selectSettingsError,
} from 'src/app/models/Settings/settings.selectors';
@Component({
  selector: 'app-website',
  templateUrl: './website.component.html',
  styleUrls: ['./website.component.scss'],
})
export class WebsiteComponent {
  loading$ = this.store.select(selectSettingsLoading);
  error$ = this.store.select(selectSettingsError);
  constructor(private store: Store<{ settings: any }>) {}
  ngOnInit() {
    this.store
      .select('settings')
      .pipe(take(1))
      .subscribe((initialState) => {
        if (!initialState['data']) {
          this.store.dispatch(loadSettings());
        }
      });
  }
}
