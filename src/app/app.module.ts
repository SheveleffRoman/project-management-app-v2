import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AboutProductComponent } from './about-product/about-product.component';
import { AboutTechComponent } from './about-tech/about-tech.component';
import { AboutTeamComponent } from './about-team/about-team.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AboutProductComponent,
    AboutTechComponent,
    AboutTeamComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      {path: '', redirectTo: '/product', pathMatch: 'full'},
      {path: 'product', component: AboutProductComponent},
      {path: 'tech', component: AboutTechComponent},
      {path: 'team', component: AboutTeamComponent},
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
