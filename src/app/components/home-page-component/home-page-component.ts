import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VoteComponent } from '../vote-component/vote-component';
import { CardComponent } from '../card-component/card-component';
import { DescricaoPipe } from '../../pipes/descricao.pipe';

type Enquete = {
  id: number;
  titulo: string;
  descricao: string;
  tipo: 'duas-opcoes' | 'varias-opcoes';
  opcoes: { texto: string; votos: number }[];
}

@Component({
  selector: 'app-home-page-component',
  imports: [FormsModule, VoteComponent, CardComponent, DescricaoPipe],
  templateUrl: './home-page-component.html',
  styleUrl: './home-page-component.css',
})
export class HomePageComponent {
  enquetes = signal<Enquete[]>([
    {
      id: Date.now(),
      titulo: 'Quem vai ganhar a copa do mundo de 2026?',
      descricao: 'Descrição muito longa para testar o pipe de descrição. Descrição muito longa para testar o pipe de descrição',
      tipo: 'varias-opcoes',
      opcoes: [
        { texto: 'Brasil', votos: 5 },
        { texto: 'França', votos: 3 },
        { texto: 'Argentina', votos: 2 },
        { texto: 'Portugal', votos: 1 },
        { texto: 'Espanha', votos: 1 }
      ]
    }
  ]);

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
    const temTitulo = this.novoTitulo.trim();
    const quantidadeOpcoes = this.opcoesTemporarias.length;

    if (!temTitulo || quantidadeOpcoes < 2) {
      return;
    }

    const podeCriar = this.novoTipo === 'duas-opcoes'
      ? quantidadeOpcoes === 2
      : quantidadeOpcoes >= 2;

    if (!podeCriar) {
      return;
    }

    const novaEnquete: Enquete = {
      id: Date.now(),
      titulo: temTitulo,
      descricao: this.novaDescricao,
      tipo: this.novoTipo as Enquete['tipo'],
      opcoes: [...this.opcoesTemporarias],
    };

    this.enquetes.update((enquetes) => [...enquetes, novaEnquete]);

    this.novoTitulo = '';
    this.novaDescricao = '';
    this.novoTipo = 'duas-opcoes';
    this.opcoesTemporarias = [];
  }

  processarVoto(enqueteId: number, opcaoTexto: string) {
    this.enquetes.update((enquetes) =>
      enquetes.map((enquete) => {
        if (enquete.id !== enqueteId) {
          return enquete;
        }

        return {
          ...enquete,
          opcoes: enquete.opcoes.map((opcao) =>
            opcao.texto === opcaoTexto ? { ...opcao, votos: opcao.votos + 1 } : opcao,
          ),
        };
      }),
    );
  }
}