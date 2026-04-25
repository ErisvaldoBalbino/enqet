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
