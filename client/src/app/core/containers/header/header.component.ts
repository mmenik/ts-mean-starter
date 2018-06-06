import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from '../../../auth/services/auth.service';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../../app.reducer';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidenav = new EventEmitter<void>();

  isAuth$: Observable<boolean>;
  username$: Observable<string>;

  constructor(
    private readonly store: Store<fromRoot.State>,
    private readonly authService: AuthService,
    private readonly translate: TranslateService
  ) { }

  ngOnInit() {
    this.isAuth$ = this.store.select(fromRoot.getIsAuthenticated);
    this.username$ = this.store.select(fromRoot.getUseranme);

    this.translate.get(['header.title']).subscribe((res: any) => {
      console.log(res);
    });
  }

  onToggleSidenav() {
    this.toggleSidenav.emit();
  }

  onLogout() {
    this.authService.logout();
  }
}
