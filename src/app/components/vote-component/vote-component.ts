import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vote-component',
  imports: [FormsModule],
  templateUrl: './vote-component.html',
  styleUrl: './vote-component.css',
})
export class VoteComponent {
  @Input() opcoes: any[] = [];
  @Input() tipoEnquete: string = 'duas-opcoes';

  @Output() votoEmitido = new EventEmitter<string>();

  opcaoSelecionada: string = '';

  get totalVotos(): number {
    return this.opcoes.reduce((sum: number, o: any) => sum + o.votos, 0);
  }

  porcentagem(votos: number): number {
    if (this.totalVotos === 0) return this.tipoEnquete === 'duas-opcoes' ? 50 : 0;
    return Math.round((votos / this.totalVotos) * 100);
  }

  get maxVotos(): number {
    return Math.max(...this.opcoes.map((o: any) => o.votos));
  }

  votar(opcaoTexto: string) {
      this.votoEmitido.emit(opcaoTexto);
  }

  votarMultiplo() {
    if (this.opcaoSelecionada) {
      this.votoEmitido.emit(this.opcaoSelecionada);
      this.opcaoSelecionada = '';
    }
  }
}
