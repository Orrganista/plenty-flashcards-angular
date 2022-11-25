import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { FlashcardListComponent } from './flashcards/flashcard-list.component';
import { BoxComponent } from './flashcards/box.component';
import { FlashcardComponent } from './flashcards/flashcard.component';
import { DeckComponent } from './flashcards/deck.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { AddComponent } from './flashcards/add.component';
import { UnderConstructionComponent } from './under-construction/under-construction.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    FlashcardListComponent,
    BoxComponent,
    FlashcardComponent,
    DeckComponent,
    FooterComponent,
    RegistrationComponent,
    LoginComponent,
    AddComponent,
    UnderConstructionComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: 'flashcards', component: FlashcardListComponent },
      { path: 'add', component: AddComponent },
      { path: 'register', component: RegistrationComponent },
      { path: 'login', component: LoginComponent },
      { path: 'oops', component: UnderConstructionComponent },
      { path: '', component: HomeComponent },
      { path: '**', redirectTo: '', pathMatch: 'full' },
    ]),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
