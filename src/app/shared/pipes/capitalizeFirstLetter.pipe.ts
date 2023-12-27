import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizeFirstLetter'
})
export class capitalizeFirstLetterPipe  implements PipeTransform {

  transform(value: string[], ...args: unknown[]): unknown {

  if (!value || !Array.isArray(value)) {
    return value;
  }

  return value.map(dia => this.capitalizeFirstLetter(dia));

  }

  private capitalizeFirstLetter(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

}