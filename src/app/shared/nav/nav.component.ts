import { Component, OnInit } from '@angular/core';
import { faLaptopHouse } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'fml-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  pageTitle: string = 'Plenty Flashcards';
  loginStatus: string = 'SIGN IN';
  nickname: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    if (this.userService.getLoggedUser()) {
      this.nickname = this.userService.getLoggedUser().nickname;
      this.loginStatus = 'LOG OUT';
    } else {
      this.loginStatus = 'SIGN IN';
    }

    this.userService.loggedUserChanges$.subscribe((user) => {
      if (user) {
        this.nickname = user.nickname;
        this.loginStatus = 'LOG OUT';
      } else {
        this.loginStatus = 'SIGN IN';
      }
    });
  }

  logout(): void {
    this.userService.logout();
    this.nickname = '';
  }
}
