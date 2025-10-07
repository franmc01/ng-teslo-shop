import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const API_URL = environment.baseURL;

@Pipe({
  name: 'productImage',
  standalone: true
})
export class ProductImagePipe implements PipeTransform {

  transform(value: null | string | string[], ...args: unknown[]): string {
    console.log({value});
    if(value?.length === 0){
      return 'images/no-image.jpg';
    }


    // Si no hay valor, devolver la imagen por defecto
    if (!value || value.length === 0) {
      return 'images/no-image.jpg';
    }

    // Si es un array, usar la primera imagen
    if (Array.isArray(value)) {
      return `${API_URL}/files/product/${value[0]}`;
    }

    // Si es un string, usarlo directamente
    return `${API_URL}/files/product/${value}`;
  }

}
