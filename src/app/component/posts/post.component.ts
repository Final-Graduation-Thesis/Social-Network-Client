import {
	Component, ElementRef, EventEmitter,
	Input, Output, OnInit, Renderer2, ViewChild, ViewEncapsulation, AfterViewInit
} from '@angular/core';
import { AppsPostDialogComponent } from '../../component/posts/CreatePostDialog/post-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { PostService } from '../../service/post.service';
import { LikeService } from 'src/app/service/like.service';
import { Router } from '@angular/router';
import { SavedService } from 'src/app/service/saved.service';
import { MatSnackBar } from '@angular/material';

@Component({
	selector: 'apps-post-component',
	templateUrl: './post.component.html',
	styleUrls: ['./post.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class AppsPostComponent implements AfterViewInit {

	@ViewChild('images') images: ElementRef;
	@Input() post: any;
	@Output('update') onChangePostData: EventEmitter<any> = new EventEmitter();
	photosList = [
		`https://i.imgur.com/nXgEtSy.jpg`,
		`https://i.imgur.com/FcxINEt.jpg`,
		`https://i.imgur.com/bJiRyI1.jpg`,
		`https://i.imgur.com/eqhxhmi.jpg`
	]
	isOwner: boolean = false;
	liked: boolean = false;
	likeList: string;
	constructor(
		private renderer: Renderer2,
		private postService: PostService,
		private dialog: MatDialog,
		private likeService: LikeService,
		private savedService: SavedService,
		private router: Router,
		private snackBar: MatSnackBar,
	) { }

	ngOnInit() {
	
	}

	ngAfterViewInit() {
		setTimeout(() => {
			this.isOwner = parseInt(localStorage.getItem('user_id')) == this.post.userId;
		});
		this.liked = this.post.liked;
		if (this.post.images) {
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
				this.renderer.setAttribute(mainImage, 'width', (widthImg / 0.7) + 'px');
				this.renderer.setStyle(subLayout, 'display', 'grid');
				this.renderer.setStyle(subLayout, 'flex-direction', 'column');
				for (let i: number = 1; i < this.post.images.length; i++) {
					const image: ElementRef = this.renderer.createElement('img');
					const height: number = mainLayout.clientHeight / subTotalImages - 3;
					this.renderer.setStyle(image, 'height', height + 'px');
					this.renderer.appendChild(subLayout, image);
					this.renderer.setAttribute(image, 'src', this.post.images[i]);
				}
			}
		}
	}

	onDelete(): void {
		this.postService.delete(this.post.id).subscribe(res => {
			this.onChangePostData.emit();
		});
	}

	onEdit(): void {
		const dialogRef = this.dialog.open(AppsPostDialogComponent, {
			width: '450px',
			data: {
				"typeBusiness": this.post.typeBusiness,
				"title": this.post.title,
				"typeProperty": this.post.typeProperty,
				"area": this.post.area,
				"price": this.post.price,
				"address": this.post.address,
				"district": this.post.district,
				"description": this.post.description,
				"priceFrom": this.post.priceFrom,
				"priceTo": this.post.priceTo,
				"username": this.post.username,
				"userId": this.post.userId,
				"id": this.post.id,
				"isEdited": true
			}
		  });
	}

	isTypeBS13(post: any) {
		if (!post) return;
		if (post.typeBusiness === 1 || post.typeBusiness === 3) {
			return true;
		}
		return false;
	}

	getTypeBusinessStr(): string {
		switch(this.post.typeBusiness) {
			case 1:
				return 'Bán';
				break;
			case 2:
				return 'Cần mua';
				break;
			case 3:
				return 'Cho thuê';
				break;
			case 4:
				return 'Cần thuê';
				break;
			case 5:
				return 'Tìm bạn cùng phòng';
				break;
			default:
				break;
		}
	}

	likePost(): void {
		let body: any = {
			"postId": this.post.id
		};
		this.likeService.post(body).subscribe(res => {
			this.liked = true;
			this.post.totalLike++;
		});
	}

	unlikePost(): void {
		let body: any = {
			"postId": this.post.id
		};
		this.likeService.unlike(body).subscribe(res => {
			this.liked = false;
			this.post.liked = false;
			this.post.totalLike--;
		});
	}

	showLikeList(): void {
		this.likeList = 'Chưa có ai like bài viết này';
		this.likeService.list(null, {postId: this.post.id}).subscribe((res) => {
			if (res.length !== 0) {
				this.likeList = res.join('\n');
			}
		})
	}

	directToTimeline(): void {
		this.router.navigateByUrl(`timeline/${this.post.userId}`);
	}

	onSave(id: number): void {
		this.savedService.url = `${this.savedService.url}${id}`;
		this.savedService.post().subscribe({
			next: (res) => {},
			error: (err) => {
				this.snackBar.open("Đã có lỗi xảy ra, vui lòng thử lại", null, {
					duration: 2000,
					panelClass: 'error'
				});
			},
			complete: () => {
				this.snackBar.open("Lưu bài thành công", null, {
					duration: 2000,
					panelClass: 'success'
				});
			}
		}
			);
	}
}
