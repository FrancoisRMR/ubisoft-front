import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { WebSocketService } from '../webSocket.service';
import { GameDetails } from './interfaces/twitch.interface';
import { TwitchService } from './twitch.service';
@Component({
  selector: 'app-twitch',
  templateUrl: './twitch.component.html',
  styleUrls: ['./twitch.component.scss'],
})
export class TwitchComponent implements OnInit, OnDestroy {
  currentRoute!: string;
  isSingleGame!: boolean;
  gameDetails: GameDetails[] = [];
  subscriptions: Subscription = new Subscription();
  wsSub: Subscription = new Subscription();
  colors!: string[];

  constructor(
    private router: Router,
    public twitchService: TwitchService,
    private webSocketService: WebSocketService
  ) {

    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe((event: NavigationEnd) => {
        this.currentRoute = event.url;
      });
  }

  ngOnInit(): void {
    this.webSocketService.connect();
    let gameStr: string;

    if (this.currentRoute.includes('rainbow-six-siege')) {
      this.isSingleGame = true;
      gameStr = 'Rainbow Six Siege';
    } else {
      this.isSingleGame = false;
      gameStr = `Rainbow Six Siege,Far Cry 5,Assassin's Creed: Odyssey`;
    }

    this.subscriptions.add(
      this.twitchService.getNumbersViewsByGameName(gameStr).subscribe({
        next: (response: GameDetails[]) => {
          this.gameDetails = response;
        },
      })
    );

    this.colors = this.twitchService.colors.map(color => color.pointBackgroundColor)

    this.wsSub =
      this.webSocketService.getResponses().subscribe({
        next: (response: GameDetails[]) => {
          this.gameDetails = response;
        },
      })

  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.webSocketService.close();
  }
}
