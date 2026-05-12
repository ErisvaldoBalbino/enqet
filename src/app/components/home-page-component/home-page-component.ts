import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VoteComponent } from '../vote-component/vote-component';
import { CardComponent } from '../card-component/card-component';
import { DescricaoPipe } from '../../pipes/descricao.pipe';

@Component({
  selector: 'app-home-page-component',
  imports: [FormsModule, VoteComponent, CardComponent, DescricaoPipe],
  templateUrl: './home-page-component.html',
  styleUrl: './home-page-component.css',
})
export class HomePageComponent {
  enquetes: any[] = [
    {
      id: Date.now(),
      titulo: 'Quem vai ganhar a copa do mundo de 2026?',
      descricao: 'Descrição muito longa para testar o pipe de descrição. Descrição muito longa para testar o pipe de descriçãoDescrição muito longa para testar o pipe de descrição.',
      tipo: 'varias-opcoes',
      opcoes: [
        { texto: 'Brasil', votos: 5 },
        { texto: 'França', votos: 3 },
        { texto: 'Argentina', votos: 2 },
        { texto: 'Portugal', votos: 1 },
        { texto: 'Espanha', votos: 1 }
      ]
    }
  ];

  novoTitulo: string = '';
  novaDescricao: string = '';
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
    if (this.novoTitulo && this.opcoesTemporarias.length > 0 && (this.novoTipo === 'duas-opcoes' && this.opcoesTemporarias.length === 2) || (this.novoTipo === 'varias-opcoes' && this.opcoesTemporarias.length >= 2) ) {
      const novaEnquete = {
        id: Date.now(), 
        titulo: this.novoTitulo,
        descricao: this.novaDescricao,
        tipo: this.novoTipo,
        opcoes: [...this.opcoesTemporarias] 
      };

      this.enquetes.push(novaEnquete);

      this.novoTitulo = '';
      this.novaDescricao = '';
      this.novoTipo = 'duas-opcoes';
      this.opcoesTemporarias = [];
    }
  }

  processarVoto(enqueteId: number, opcaoTexto: string) {
    const enquete = this.enquetes.find(e => e.id === enqueteId);
    const opcao = enquete.opcoes.find((o: any) => o.texto === opcaoTexto);
    opcao.votos++;
  }
}