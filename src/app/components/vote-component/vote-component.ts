import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vote-component',
  imports: [FormsModule],
  templateUrl: './vote-component.html',
  styleUrl: './vote-component.css',
})
export class VoteComponent {
  opcoes = input<any>([]);
  tipoEnquete = input<string>('duas-opcoes');

  votoEmitido = output<string>();

  opcaoSelecionada: string = '';

  get totalVotos(): number {
    return this.opcoes().reduce((sum: number, o: any) => sum + o.votos, 0);
  }

  porcentagem(votos: number): number {
    if (this.totalVotos === 0) return this.tipoEnquete() === 'duas-opcoes' ? 50 : 0;
    return Math.round((votos / this.totalVotos) * 100);
  }

  get maxVotos(): number {
    return Math.max(...this.opcoes().map((o: any) => o.votos));
  }

  votar(opcaoTexto: string) {
      this.votoEmitido.emit(opcaoTexto);
  }
}
