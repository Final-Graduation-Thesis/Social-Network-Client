import { Component, OnInit, Inject, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { PostService } from 'src/app/service/post.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router'
import { ReloadService } from 'src/app/service/reload.service';

@Component({
	selector: 'apps-post-dialog-component',
	templateUrl: './post-dialog.component.html',
	styleUrls: ['./post-dialog.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class AppsPostDialogComponent implements OnInit {

	@ViewChild('price') price: ElementRef;
	@ViewChild('priceMin') priceMin: ElementRef;
	@ViewChild('priceMax') priceMax: ElementRef;

	priceNum: number;
	priceFrom: number;
	priceTo: number;
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
	districts: string[] = [
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
		'Huyện Nhà Bè',


	]
	loading: boolean;
	isPrice: boolean = true;
	selectedImage: string[]  =  [];
	constructor(
		public dialogRef: MatDialogRef<AppsPostDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private formBuilder: FormBuilder,
		private postService: PostService,
		private snackBar: MatSnackBar,
		private reloadService: ReloadService
	) { }

	ngOnInit(): void {
		let val = this.data.typeBusiness;
		if (val === 2 || val === 4 || val === 5) {
			this.isPrice = false;
		}
		else {
			this.isPrice = true;
		}
		this.form = this.formBuilder.group({
			typeBusiness: ["", Validators.required],
			title: ["", Validators.required],
			typeProperty: ["", Validators.required],
			area: ["", Validators.required],
			price: [""],
			address: ["", Validators.required],
			district: ["", Validators.required],
			description: [""],
			priceFrom: [""],
			priceTo: [""],
			images: [""],
		})
	}
	onClose(): void {
		this.dialogRef.close();
	}

	onFileChanged(event) {
		for  (var i =  0; i <  event.target.files.length; i++)  {  
			this.selectedImage.push(event.target.files[i]);
		}

	}

	submit(): void {
		this.loading = true;
		let val: any = this.form.value;
		let body = new FormData();
		for  (var i =  0; i <  this.selectedImage.length; i++)  {  
			body.append("images",  this.selectedImage[i]);
		}
		body.append("typeBusiness", val.typeBusiness ? val.typeBusiness : "");
		body.append("title", val.title ? val.title : "");
		body.append("typeProperty", val.typeProperty ? val.typeProperty : "");
		body.append("area", val.area ? val.area : "");
		body.append("price", this.priceNum ? this.priceNum.toString() : "");
		body.append("address", val.address ? val.address : "");
		body.append("district", val.district ? val.district : "");
		body.append("description", val.description ? val.description : "");
		body.append("priceFrom", this.priceFrom ? this.priceFrom.toString() : "");
		body.append("priceTo", this.priceTo ? this.priceTo.toString() : "");
		body.append("expiredAt", "30-10-2020");
		body.append("roomNumber", "2");

		let bodyPut: any = {
			"typeBusiness": val.typeBusiness ? val.typeBusiness : "",
			"title": val.title ? val.title : "",
			"typeProperty": val.typeProperty ? val.typeProperty : "",
			"area": val.area ? val.area : "",
			"price": val.price ? val.price : "",
			"address": val.address ? val.address : "",
			"district": val.district ? val.district : "",
			"description": val.description ? val.description : "",
			"priceFrom": val.priceFrom,
			"priceTo": val.priceTo,
		}
		if (!this.form.valid) {
			this.snackBar.open("Vui lòng nhập thông tin", null, {
				duration: 1000,
				panelClass: 'error'
			});
			this.loading = false;
		}
		else {
			if (!this.data.isEdited) {
				this.postService.post(body).subscribe({
					next: (res) => {
					this.loading = false;
					this.onClose();
					this.reloadService.reloadPost(true);
					this.snackBar.open("Đăng bài thành công", null, {
						duration: 2000,
						panelClass: 'success'
					});
				},
				error: (err) => {
					this.loading = false;
					this.onClose();
					this.reloadService.reloadPost(true);
					this.snackBar.open("Đã có lỗi xảy ra, vui lòng thử lại", null, {
						duration: 2000,
						panelClass: 'error'
					});
				}
			}
				);
			}
			else {
				this.postService.put(this.data.id, bodyPut).subscribe({
					next: (res) => {
						this.loading = false;
						this.onClose();
						this.reloadService.reloadPost(true);
						this.snackBar.open("Sửa bài thành công", null, {
							duration: 2000,
							panelClass: 'success'
						});
					},
					error: (err) => {
						this.loading = false;
						this.onClose();
						this.reloadService.reloadPost(true);
						this.snackBar.open("Sửa bài thành công", null, {
							duration: 2000,
							panelClass: 'success'
						});
					}
				}
					);
			}
		}
	}

	onChangeTypeBusiness(): void {
		let val: number = this.form.value.typeBusiness;
		if (val === 2 || val === 4 || val === 5) {
			this.isPrice = false;
		}
		else {
			this.isPrice = true;
		}
	}

	formatPriceCurrency(e: any): void {
		this.price.nativeElement.value = e.target.value.replace(
			/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
		this.priceNum = parseInt(this.price.nativeElement.value.replace(
			/\B(?=(\d{3})+(?!\d))/g, ".").replace(/\D/g, ""));
	}

	formatMinCurrency(e: any): void {
		this.priceMin.nativeElement.value = e.target.value.replace(
			/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
		this.priceFrom = parseInt(this.priceMin.nativeElement.value.replace(
			/\B(?=(\d{3})+(?!\d))/g, ",").replace(/\D/g, ""));
	}

	formatMaxCurrency(e: any): void {
		this.priceMax.nativeElement.value = e.target.value.replace(
			/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
		this.priceTo = parseInt(this.priceMax.nativeElement.value.replace(
			/\B(?=(\d{3})+(?!\d))/g, ".").replace(/\D/g, ""));
	}
}