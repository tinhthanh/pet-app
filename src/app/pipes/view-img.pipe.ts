import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'viewImg',
  standalone: true
})
export class ViewImgPipe implements PipeTransform {
  transform(id: string | null, sz: string = 'w1024'): string {
    const imgKit = `https://ik.imagekit.io/gwvvtllmx/tr:w-${sz.replace('w', '')}` 
    if(id) {
       if(id.startsWith('http')) {
        return `${imgKit}/${id}` ;
       }
       // gwvvtllmx k40cntt@gmail.com
      return `${imgKit}/https://drive.google.com/thumbnail?id=${id}&sz=${sz}`;
    } else {
      return `assets/icon/ion--image-outline.svg`;
    }
  }
}
