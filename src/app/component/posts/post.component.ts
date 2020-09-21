import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';

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
	photosList = [
				`https://i.imgur.com/nXgEtSy.jpg`,
				`https://i.imgur.com/FcxINEt.jpg`,
				`https://i.imgur.com/bJiRyI1.jpg`,
				`https://i.imgur.com/eqhxhmi.jpg`
				]
				

	constructor(
		private renderer: Renderer2
		) {}

	ngOnInit() {
		console.log(this.post);
		if (this.post.images.length === 1) {
			const img = this.renderer.createElement('img');
			this.renderer.appendChild(this.images.nativeElement, img);
			this.renderer.setAttribute(img, 'src', this.post.images[0]);
		} else {
			const subTotalImages: number = this.post.images.length - 1;
			this.renderer.setStyle(this.images.nativeElement, 'display', 'grid');
			this.renderer.setStyle(this.images.nativeElement, 'grid-template-columns', '70% 30%');
			const mainLayout = this.renderer.createElement('div');
			this.renderer.appendChild(this.images.nativeElement, mainLayout)
			const subLayout = this.renderer.createElement('div');
			this.renderer.appendChild(this.images.nativeElement, subLayout)
			const mainImage = this.renderer.createElement('img'); 
			this.renderer.appendChild(mainLayout, mainImage);
			this.renderer.setAttribute(mainImage, 'src', this.post.images[0]);
			this.renderer.setStyle(subLayout, 'display', 'grid');
			this.renderer.setStyle(subLayout, 'flex-direction', 'column');
			console.log(mainImage.clientHeight);
			for (let i: number = 1; i < this.post.images.length; i++) {
				const image: ElementRef = this.renderer.createElement('img');
				const height: number = mainImage.clientHeight/subTotalImages;
				this.renderer.setStyle(image, 'height', height + 'px');
				this.renderer.appendChild(subLayout, image);
				this.renderer.setAttribute(image, 'src', this.post.images[i]);
			}
		}
	}

}
