import { Component, OnInit, ElementRef } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './auth/services/auth.service';

import { Store } from '@ngrx/store';
import * as fromRoot from './app.reducer';
import { OverlayContainer } from '@angular/cdk/overlay';
import { environment } from '../environments/environment';
import { InitApp } from './core/store/actions/layout.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    public readonly matIconRegistry: MatIconRegistry,
    private readonly element: ElementRef,
    private readonly overlayContainer: OverlayContainer,
    private readonly domSanitizer: DomSanitizer,
    private readonly translate: TranslateService,
    private readonly authService: AuthService,
    private readonly store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.matIconRegistry.addSvgIcon('it', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/it.svg'));
    this.matIconRegistry.addSvgIcon('en', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons/en.svg'));

    this.translate.setDefaultLang('en');
    this.translate.use('en');

    this.store.select(fromRoot.getIsDarkTheme)
      .subscribe(isDark => {
        if (isDark) {
          this.element.nativeElement.classList.add(environment.darkTheme);
          this.overlayContainer.getContainerElement().classList.add(environment.darkTheme);
        } else {
          this.element.nativeElement.classList.remove(environment.darkTheme);
          this.overlayContainer.getContainerElement().classList.remove(environment.darkTheme);
        }
      });

    this.store.select(fromRoot.getLanguage)
      .subscribe(language => {
        console.log('SET LANGUATE:', language);
        this.translate.use(language);
      });

    this.authService.init();
    this.store.dispatch(new InitApp());
  }
}
