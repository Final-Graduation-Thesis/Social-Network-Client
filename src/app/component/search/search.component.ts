import {
	Component, OnInit, ViewEncapsulation
} from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
	selector: 'apps-search-component',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class AppsSearchComponent implements OnInit {

	form: FormGroup;
	typeBusiness: any[] = [
		{
			name: "Bán",
			value: 1
		},
		{
			name: "Mua",
			value: 2
		},
		{
			name: "Cho thuê",
			value: 3
		},
		{
			name: "Cần thuê",
			value: 4
		},
		{
			name: "Tìm bạn cùng phòng",
			value: 5
		}

	]
	typeProperty: any[] = [
		{
			name: "Nhà đất",
			value: 1
		},
		{
			name: "Chung cư",
			value: 2
		},
		{
			name: "Phòng trọ",
			value: 3
		}
	]
	district: string[] = [
		'Quận 1',
		'Quận 2',
		'Quận 3',
		'Quận 4',
		'Quận 5',
		'Quận 6',
		'Quận 7',
		'Quận 8',
		'Quận 9',
		'Quận 10',
		'Quận 11',
		'Quận 12',
		'Quận Bình Thạnh',
		'Quận Bình Tân',
		'Quận Bình Chánh',
		'Quận Tân Bình',
		'Quận Tân Phú',
		'Quận Phú Nhuận',
		'Quận Gò Vấp',
		'Quận Thủ Đức',
		'Huyện Cần Giờ',
		'Huyện Củ Chi',
		'Huyện Hóc Môn',
		'Huyện Nhà Bè'
	]
	constructor(
		private formBuilder: FormBuilder,
	) { }

	ngOnInit() {
		this.form = this.formBuilder.group({
			typeBusiness: "",
			typeProperty: "",
			area: "",
			priceMin: "",
			priceMax: "",
			district: "",
		})
	}

	search(): void {
		if (this.form.value.priceMin > this.form.value.priceMax) {
			console.log('ádasdasd');
		} else {

		}
	}
}
