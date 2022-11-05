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

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    FlashcardListComponent,
    BoxComponent,
    FlashcardComponent,
    DeckComponent,
  ],
  imports: [BrowserModule, HttpClientModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
