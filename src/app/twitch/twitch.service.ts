import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GameDetails, TokenResponse } from './interfaces/twitch.interface';

@Injectable({
  providedIn: 'root',
})
export class TwitchService {
  private _clientId = 'wsgxey0lxu9mw8xfr0nd51lp3p3yyy';
  private _secret = 'am5leu84v1a98yjfm6t5wth9vepjcl';
  private _twitchUrl = `https://id.twitch.tv`;
  private _backendUrl = 'http://localhost:3000';
  private _accessToken!: string;
  colors = [{
    backgroundColor: 'rgba(229, 229, 82, 0.2)',
    pointBackgroundColor: 'rgba(229,229,82,1)',
    pointHoverBorderColor: 'rgba(229,229,82,0.8)',
  },
  {
    backgroundColor: 'rgba(211, 21, 21, 0.2)',
    pointBackgroundColor: 'rgba(211,21,21,1)',
    pointHoverBorderColor: 'rgba(211,21,21,0.8)',
  },
  {
    backgroundColor: 'rgba(21, 173, 211, 0.2)',
    pointBackgroundColor: 'rgba(21,173,211,1)',
    pointHoverBorderColor: 'rgba(21,173,211,0.8)',
  }]

  constructor(private http: HttpClient) {}

  get accessToken() {
    return this._accessToken;
  }

  set accessToken(value: string) {
    this._accessToken = value;
  }

  getToken(): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${this._twitchUrl}/oauth2/token`, {
      client_id: this._clientId,
      client_secret: this._secret,
      grant_type: 'client_credentials',
    });
  }

  initConnectionWithBackend(): Observable<boolean> {
    return this.http.get<boolean>(`${this._backendUrl}/connection`);
  }

  getNumbersViewsByGameName(name: string): Observable<GameDetails[]> {
    const headers = new HttpHeaders()
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${this.accessToken}`)
      .set('Client-Id', this._clientId);

    return this.http.get<GameDetails[]>(`${this._backendUrl}/games/views?name=${name}`, {
      headers: headers,
    });
  }
}
