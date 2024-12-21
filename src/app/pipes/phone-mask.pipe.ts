import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneMask',
  standalone: true
})
export class PhoneMaskPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    // Đảm bảo số điện thoại có độ dài tối thiểu để che
    if (value.length < 7) return value;

    // Che số giữa
    const start = value.slice(0, 3); // 3 ký tự đầu
    const end = value.slice(-4); // 4 ký tự cuối
    const masked = '***';

    return `${start} ${masked} ${end}`;
  }
}
