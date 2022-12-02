import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from '../services/session.service';
import { SessionFlashcard } from './sessionFlashcard';

@Component({
  selector: 'fml-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css'],
})
export class SessionComponent implements OnInit {
  session?: Array<SessionFlashcard>;
  sessionSize: number = 0;
  currentFlashcard?: SessionFlashcard;
  currenIndex: number = 0;
  revealed: boolean = false;

  constructor(
    private sessionService: SessionService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const sessionId = this.route.snapshot.paramMap.get('id');
    console.log('Session: ' + sessionId);

    // this.route.queryParams.subscribe((params) => {
    //   this.sessionId = params['id'];
    // });

    this.session = this.sessionService.getSession();
    this.sessionSize = this.session.length;
    this.loadFlashcard();
  }

  loadFlashcard(): void {
    this.currentFlashcard = this.session![this.currenIndex];
  }

  reveal(): void {
    this.toggleReveal();
  }

  toggleReveal(): void {
    this.revealed = !this.revealed;
  }

  wasRight(v: boolean): void {
    if (v) {
      this.session?.splice(this.currenIndex, 1);
    } else {
      this.currenIndex++;
    }

    this.currenIndex %= this.session!.length;

    if (this.session?.length === 0) {
      setTimeout(() => {
        this.router.navigate(['/choice']);
      }, 3 * 1000);
    }

    this.loadFlashcard();
    this.toggleReveal();
  }
}
