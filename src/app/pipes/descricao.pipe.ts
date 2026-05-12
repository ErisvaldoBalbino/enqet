import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'descricao'
})
export class DescricaoPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    if (value.length <= 80) return value;
    return value.slice(0, 80) + '...';
  }
}
