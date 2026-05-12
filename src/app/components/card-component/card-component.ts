import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-card-component',
  imports: [ DatePipe ],
  templateUrl: './card-component.html',
  styleUrl: './card-component.css',
})
export class CardComponent {
  titulo = input<string>();
  descricao = input<string>();
  dataCriacao = input<number>(Date.now());
}
