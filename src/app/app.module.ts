import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import {DragDropModule} from '@angular/cdk/drag-drop';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AboutProductComponent } from './about-product/about-product.component';
import { AboutTechComponent } from './about-tech/about-tech.component';
import { AboutTeamComponent } from './about-team/about-team.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthDirective } from './auth.directive';
import { BoardComponent } from './board/board.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { WarningDialogComponent } from './warning-dialog/warning-dialog.component';
import { BoardHeaderComponent } from './board-header/board-header.component';
import { BoardMainContentComponent } from './board-main-content/board-main-content.component';
import { BoardColumnComponent } from './board-column/board-column.component';
import { BoardTaskComponent } from './board-task/board-task.component';
import { BoardSideMenuComponent } from './board-side-menu/board-side-menu.component';
import { BoardHeaderSearchComponent } from './board-header-search/board-header-search.component';
import { BoardHeaderProfileComponent } from './board-header-profile/board-header-profile.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomePageComponent,
    children: [
      { path: '', redirectTo: '/board', pathMatch: 'full' }, // временные изменения для производства
      { path: 'welcome', redirectTo: '/welcome/product', pathMatch: 'full' },
      { path: 'welcome/product', component: AboutProductComponent },
      { path: 'welcome/tech', component: AboutTechComponent },
      { path: 'welcome/team', component: AboutTeamComponent },
      { path: 'welcome/login', component: LoginComponent },
      { path: 'welcome/signup', component: SignUpComponent },
    ],
  },
  { path: 'board', component: BoardComponent },
];

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
    AuthDirective,
    BoardComponent,
    WelcomePageComponent,
    WarningDialogComponent,
    BoardHeaderComponent,
    BoardMainContentComponent,
    BoardColumnComponent,
    BoardTaskComponent,
    BoardSideMenuComponent,
    BoardHeaderSearchComponent,
    BoardHeaderProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatDialogModule,
    DragDropModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
