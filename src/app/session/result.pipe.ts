import { Pipe, PipeTransform } from '@angular/core';
import { SessionService } from '../services/session.service';

@Pipe({
  name: 'result',
})
export class ResultPipe implements PipeTransform {
  transform(currLength: number, param: number): number {
    return param - currLength;
  }
}
