import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { FlashcardListComponent } from './flashcards/flashcard-list.component';
import { BoxComponent } from './flashcards/box.component';
import { FlashcardComponent } from './flashcards/flashcard.component';
import { DeckComponent } from './flashcards/deck.component';
import { FlashcardAddComponent } from './flashcards/flashcard-add.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    FlashcardListComponent,
    BoxComponent,
    FlashcardComponent,
    DeckComponent,
    FlashcardAddComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FontAwesomeModule,
    RouterModule.forRoot([
      { path: 'flashcards', component: FlashcardListComponent },
      { path: 'add', component: FlashcardAddComponent },
      { path: '', component: HomeComponent },
      { path: '**', redirectTo: '', pathMatch: 'full' },
    ]),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
