import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgChartsModule } from 'ng2-charts';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { ChartComponent } from './chart/chart.component';
import { MultipleGamesComponent } from './multiple-games/multiple-games.component';
import { SingleGameComponent } from './single-game/single-game.component';
import { TwitchComponent } from './twitch/twitch.component';
import { TwitchService } from './twitch/twitch.service';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

function initializeAppFactory(
  twitchService: TwitchService
): () => Observable<any> {
  return () => twitchService.initConnectionWithBackend();
}

@NgModule({
  declarations: [
    AppComponent,
    TwitchComponent,
    SingleGameComponent,
    MultipleGamesComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SocketIoModule.forRoot(config),
    BrowserAnimationsModule,
    NgChartsModule,
    AppRoutingModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAppFactory,
      deps: [TwitchService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
