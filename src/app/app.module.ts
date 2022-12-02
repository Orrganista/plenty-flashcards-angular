import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavComponent } from './shared/nav/nav.component';
import { HomeComponent } from './home/home.component';
import { FlashcardsListComponent } from './flashcards/flashcards-list.component';
import { BoxComponent } from './flashcards/box/box.component';
import { FlashcardComponent } from './flashcards/flashcard/flashcard.component';
import { DeckComponent } from './flashcards/deck/deck.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './shared/footer/footer.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { FlashcardEditComponent } from './flashcards/flashcard/flashcard-edit.component';
import { UnderConstructionComponent } from './under-construction/under-construction.component';
import { SessionChoiceComponent } from './session/session-choice.component';
import { HighlightRowDirective } from './session/highlight-row.directive';
import { ShowContentDirective } from './session/show-content.directive';
import { SessionComponent } from './session/session.component';
import { NotEmptyDeckPipe } from './session/not-empty-deck.pipe';
import { ResultPipe } from './session/result.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    FlashcardsListComponent,
    BoxComponent,
    FlashcardComponent,
    DeckComponent,
    FooterComponent,
    RegistrationComponent,
    LoginComponent,
    FlashcardEditComponent,
    UnderConstructionComponent,
    SessionChoiceComponent,
    HighlightRowDirective,
    ShowContentDirective,
    SessionComponent,
    NotEmptyDeckPipe,
    ResultPipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path: 'flashcards',
        component: FlashcardsListComponent,
        children: [{ path: 'box/:id', component: BoxComponent }],
      },
      { path: 'add', component: FlashcardEditComponent },
      { path: 'register', component: RegistrationComponent },
      { path: 'login', component: LoginComponent },
      { path: 'session', component: SessionChoiceComponent },
      { path: 'session/:id', component: SessionComponent },
      { path: 'oops', component: UnderConstructionComponent },
      { path: '', component: HomeComponent },
      { path: '**', redirectTo: '', pathMatch: 'full' },
    ]),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
