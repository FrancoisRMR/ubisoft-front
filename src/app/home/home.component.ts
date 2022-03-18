import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('myAnimationTrigger', [
      state(
        'false',
        style({
          backgroundColor: 'rgba(0, 0, 0, 0)',
        })
      ),
      state(
        'true',
        style({
          backgroundColor: 'rgba(0, 0, 0, 0.80)',
        })
      ),
      transition('false <=> true', animate('1s ease')),
    ]),
  ],
})
export class HomeComponent implements OnInit {

  constructor(private renderer: Renderer2, private router: Router) {}

  ngOnInit(): void {}

  onOver(elMouseOver: HTMLDivElement, elMouseLeave: HTMLDivElement) {
    this.renderer.setProperty(elMouseOver, '@myAnimationTrigger', 'true');
    this.renderer.setProperty(elMouseLeave, '@myAnimationTrigger', 'false');
  }

  onLeave(el: HTMLDivElement[]) {
    el.forEach((el: HTMLDivElement) =>
      this.renderer.setProperty(el, '@myAnimationTrigger', 'true')
    );
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
