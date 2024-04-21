import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter',
})
export class SearchFilterPipe implements PipeTransform {
  transform(list: any[], searchTerm: string): any {
    return list
      ? list.filter(item =>
          item.nomProduit.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : [];
  }
}
