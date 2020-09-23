import { Component, ElementRef, EventEmitter,
	Input, Output, OnInit, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';

import { PostService } from '../../service/post.service';
@Component({
	selector: 'apps-post-component',
	templateUrl: './post.component.html',
	styleUrls: ['./post.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class AppsPostComponent implements OnInit {

	@ViewChild('images') images: ElementRef;
	@Input() post: any;
	@Output('update') onChangePostData: EventEmitter<any> = new EventEmitter();
	photosList = [
				`https://i.imgur.com/nXgEtSy.jpg`,
				`https://i.imgur.com/FcxINEt.jpg`,
				`https://i.imgur.com/bJiRyI1.jpg`,
				`https://i.imgur.com/eqhxhmi.jpg`
				]
				

	constructor(
		private renderer: Renderer2,
		private postService: PostService
		) {}

	ngOnInit() {
		console.log(this.post);
		if (this.post.images.length === 1) {
			const img = this.renderer.createElement('img');
			this.renderer.appendChild(this.images.nativeElement, img);
			this.renderer.setAttribute(img, 'src', this.post.images[0]);
		} else {
			let widthImg: number = this.images.nativeElement.offsetWidth;
			const subTotalImages: number = this.post.images.length - 1;
			this.renderer.setStyle(this.images.nativeElement, 'display', 'grid');
			const mainLayout = this.renderer.createElement('div');
			this.renderer.appendChild(this.images.nativeElement, mainLayout)
			const subLayout = this.renderer.createElement('div');
			this.renderer.appendChild(this.images.nativeElement, subLayout)
			const mainImage = this.renderer.createElement('img');
			if (this.post.images.length === 2) {
				this.renderer.setStyle(this.images.nativeElement, 'grid-template-columns', '50% 50%');
			} else {
				this.renderer.setStyle(this.images.nativeElement, 'grid-template-columns', '70% 30%');
			}
			
			this.renderer.appendChild(mainLayout, mainImage);
			this.renderer.setAttribute(mainImage, 'src', this.post.images[0]);
			this.renderer.setAttribute(mainImage, 'width', (widthImg/0.7) + 'px');
			this.renderer.setStyle(subLayout, 'display', 'grid');
			this.renderer.setStyle(subLayout, 'flex-direction', 'column');
			console.log(mainLayout.clientHeight);
			for (let i: number = 1; i < this.post.images.length; i++) {
				const image: ElementRef = this.renderer.createElement('img');
				const height: number = mainLayout.clientHeight/subTotalImages - 3;
				this.renderer.setStyle(image, 'height', height + 'px');
				this.renderer.appendChild(subLayout, image);
				this.renderer.setAttribute(image, 'src', this.post.images[i]);
			}
		}
	}

	onDelete(): void {
		console.log('asddasd');
		this.postService.delete(this.post.id).subscribe(res => {
			 console.log('qwe');
		 this.onChangePostData.emit();
		});
	}

}
