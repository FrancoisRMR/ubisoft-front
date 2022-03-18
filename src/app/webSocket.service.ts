import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { GameDetails } from './twitch/interfaces/twitch.interface';


@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  constructor(private socket: Socket) {
  }

  sendMessage(msg: string) {
    this.socket.emit('sendData', msg);
  }

  getResponses(): Observable<GameDetails[]> {
    return this.socket.fromEvent<GameDetails[]>('getViewversByGames')
  }

  connect() {
    this.socket.connect()
  }

  close() {
    this.socket.disconnect();
  }

  public userPing(userName: string): void {
    this.sendMessage(userName);
  }
}
