import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UpperCasePipe } from '@angular/common';
import { VoteComponent } from '../vote-component/vote-component';
import { CardComponent } from '../card-component/card-component';

@Component({
  selector: 'app-home-page-component',
  imports: [FormsModule, UpperCasePipe, VoteComponent, CardComponent],
  templateUrl: './home-page-component.html',
  styleUrl: './home-page-component.css',
})
export class HomePageComponent {
  enquetes: any[] = [];


  novoTitulo: string = '';
  novoTipo: string = 'duas-opcoes'; 
  novaOpcaoTexto: string = '';
  opcoesTemporarias: any[] = []; 

  adicionarOpcaoRascunho() {
    if (this.novaOpcaoTexto.trim()) {
      this.opcoesTemporarias.push({ texto: this.novaOpcaoTexto, votos: 0 });
      this.novaOpcaoTexto = '';
    }
  }

  criarEnquete() {
    if (this.novoTitulo && this.opcoesTemporarias.length > 0) {
      const novaEnquete = {
        id: Date.now(), 
        titulo: this.novoTitulo,
        tipo: this.novoTipo,
        opcoes: [...this.opcoesTemporarias] 
      };

      this.enquetes.push(novaEnquete);

      this.novoTitulo = '';
      this.novoTipo = 'duas-opcoes';
      this.opcoesTemporarias = [];
    }
  }

  processarVoto(enqueteId: number, opcaoTexto: string) {
    const enquete = this.enquetes.find(e => e.id === enqueteId);
    if (enquete) {
      const opcao = enquete.opcoes.find((o: any) => o.texto === opcaoTexto);
      if (opcao) {
        opcao.votos++;
      }
    }
  }
}