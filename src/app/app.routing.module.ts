import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MultipleGamesComponent } from './multiple-games/multiple-games.component';
import { TwitchComponent } from './twitch/twitch.component';

export const routes: Routes = ([] = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'rainbow-six-siege',
    component: TwitchComponent,
  },
  {
    path: 'multiple-games',
    component: TwitchComponent,
  },
  {
    path: '**',
    redirectTo: 'landing',
  },
]);

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
