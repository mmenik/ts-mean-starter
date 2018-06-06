import { NgModule } from '@angular/core';
import { HomeComponent } from './containers/home/home.component';
import { HeaderComponent } from './containers/header/header.component';
import { FooterComponent } from './containers/footer/footer.component';
import { SidenavComponent } from './containers/sidenav/sidenav.component';
import { AppCommonModule } from '../app-common.module';
import { RouterModule } from '@angular/router';
import { DateComponent } from './components/date/date.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { EffectsModule } from '@ngrx/effects';
import { LayoutEffects } from './store/effects/layout.effects';

@NgModule({
  imports: [
    AppCommonModule,
    RouterModule,
    EffectsModule.forFeature([LayoutEffects])
  ],
  declarations: [
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    SidenavComponent,
    DateComponent,
    SpinnerComponent
  ],
  exports: [
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    SidenavComponent,
    SpinnerComponent
  ]
})
export class CoreModule { }
