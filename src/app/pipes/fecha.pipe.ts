import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';

@Pipe({
  name: 'fecha'
})
export class FechaPipe implements PipeTransform {

  constructor(private datePipe : DatePipe){

  }
  transform(value: Timestamp | undefined): string {
    return this.datePipe.transform(value?.toMillis(), 'dd/MM/Y H:mm') ?? '';
  }

}
