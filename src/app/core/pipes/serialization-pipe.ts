import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'serialization'
})
export class SerializationPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
