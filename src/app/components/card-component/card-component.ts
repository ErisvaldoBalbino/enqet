import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-card-component',
  imports: [ DatePipe ],
  templateUrl: './card-component.html',
  styleUrl: './card-component.css',
})
export class CardComponent {
  dataCriacao = input<number>(Date.now());
}
