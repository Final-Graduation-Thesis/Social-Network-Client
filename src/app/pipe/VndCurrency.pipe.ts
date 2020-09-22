import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
	name: 'vndCurrency'
})
export class VndCurrencyPipe implements PipeTransform {
	transform(value: number | string): string {
		value = value.toString();
		let i: number = 0;
		let j: number = value.length;
		let val: string[] = [];
		while (j > 0) {
			i++;
			j--;
			if (i % 3 === 0) {
				val.push(value[j]);
				val.push('.');
			} else {
				val.push(value[j]);
			}
		}
		if (value.length % 3 === 0) {
			val.pop();
		}
		console.log();
		return val.reverse().join('') + ' VNĐ';
	}
}