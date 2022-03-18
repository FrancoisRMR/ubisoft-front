import {
  Component,
  EventEmitter,
  Input, OnInit,
  Output
} from '@angular/core';
import { GameDetails } from '../twitch/interfaces/twitch.interface';

@Component({
  selector: 'app-multiple-games',
  templateUrl: './multiple-games.component.html',
  styleUrls: ['./multiple-games.component.scss'],
})
export class MultipleGamesComponent implements OnInit {
  @Input() dataToDisplay!: GameDetails[];
  @Input() colors!: string[];
  @Output() navigateToOutput: EventEmitter<string> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  navigateTo(route: string) {
    this.navigateToOutput.emit(route);
  }
}
