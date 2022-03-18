import {
  Component,
  EventEmitter,
  Input, OnInit,
  Output
} from '@angular/core';
import { GameDetails } from '../twitch/interfaces/twitch.interface';

@Component({
  selector: 'app-single-game',
  templateUrl: './single-game.component.html',
  styleUrls: ['./single-game.component.scss'],
})
export class SingleGameComponent implements OnInit {
  @Input() dataToDisplay!: GameDetails;
  @Output() navigateToOutput: EventEmitter<string> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  navigateTo(route: string) {
    this.navigateToOutput.emit(route);
  }
}
