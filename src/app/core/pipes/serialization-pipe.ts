import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'serialization',
})
export class SerializationPipe implements PipeTransform {
  transform(value: number | undefined): string {
    if (!value) return '';

    return String(value).padStart(3, '0');
  }
}
