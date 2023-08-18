import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AboutProductComponent } from './about-product/about-product.component';
import { AboutTechComponent } from './about-tech/about-tech.component';
import { AboutTeamComponent } from './about-team/about-team.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AboutProductComponent,
    AboutTechComponent,
    AboutTeamComponent,
    LoginComponent,
    SignUpComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path: '', redirectTo: '/product', pathMatch: 'full'},
      {path: 'product', component: AboutProductComponent},
      {path: 'tech', component: AboutTechComponent},
      {path: 'team', component: AboutTeamComponent},
      {path: 'login', component: LoginComponent},
      {path: 'signup', component: SignUpComponent},

    ]),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
