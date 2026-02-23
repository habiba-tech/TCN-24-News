import { Component,input } from '@angular/core';
import { Video } from '../../services/fetch-video';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {

  data = input<Video>();

  ngOnInit() {
    console.log(this.data);
  }
}
