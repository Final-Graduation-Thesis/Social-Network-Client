import { HttpParams } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from 'src/app/service/post.service';

@Component({
	selector: 'apps-map-view',
	templateUrl: './map.view.html',
	styleUrls: ['./map.view.scss'],
	encapsulation: ViewEncapsulation.None
})
export class AppsMapView implements OnInit {
	@ViewChild('mapContainer') gmap: ElementRef;
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
	delayFactor: number = 0;
	map: google.maps.Map;
	lat = 10.8016345;
	lng = 106.6742159;
	public geoList: any[] = [];
	coordinates = new google.maps.LatLng(this.lat, this.lng);
	mapOptions: google.maps.MapOptions = {
		center: this.coordinates,
		zoom: 12,
	};
	public postList: any[] = [1];
	timeout: number = 1000;
	drawingManager: any;
	constructor(
		private postService: PostService,
		private router: Router
	) { }

	ngOnInit(): void {
		this.mapInitializer();
		this.initPostList();
		this.drawingManager = new google.maps.drawing.DrawingManager({
			drawingMode: google.maps.drawing.OverlayType.MARKER,
			drawingControl: true,
			drawingControlOptions: {
				position: google.maps.ControlPosition.TOP_CENTER,
				drawingModes: [
					google.maps.drawing.OverlayType.POLYGON,
					google.maps.drawing.OverlayType.POLYLINE,
				],
			},
			markerOptions: {
				icon:
					"https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
			},
			circleOptions: {
				fillColor: "#ffff00",
				fillOpacity: 1,
				strokeWeight: 5,
				clickable: false,
				editable: true,
				zIndex: 1,
			},
		});
		this.drawingManager.setMap(this.map);
		google.maps.event.addListener(this.drawingManager, 'overlaycomplete', function (this, event) {
			this.drawingAreas.push(event.overlay);
			const pointLength: number = event.overlay.getPath().getArray().length;
			let g: any[] = [];
			for (let i = 0; i < pointLength; i++) {
				let point: any = {
					lat: event.overlay.getPath().getArray()[i].lat(),
					lng: event.overlay.getPath().getArray()[i].lng()
				}
				g.push(point);
			}
			this.drawingArea = new google.maps.Polygon({ paths: g });
			this.drawingAreas.push(this.drawingArea);
			console.log(this.postList);
			if (this.typeBusiness) {
				this.postList = this.postList.filter(item => item.typeBusiness == this.typeBusiness);
			}
			if (this.typeProperty) {
				this.postList = this.postList.filter(item => item.typeProperty == this.typeProperty);
			}

			this.postList.forEach(item => {
				const resultPath = google.maps.geometry.poly.containsLocation(
					new google.maps.LatLng({lat: item.geocode.lat(), lng: item.geocode.lng()}),
					this.drawingArea
				)
					? // A triangle.
					true
					: false;
					let contentString;
					if (parseInt(item.typeBusiness) == 1 || parseInt(item.typeBusiness) == 3) {
					  contentString = `
					  <div class="post" (click)="navigateToPost(item.id)">
					<div class="avatar">
						<img src="${item.images[0] || 'https://timviec365.vn/pictures/images/b%C4%91s-la-gi-1.jpg'}">
					</div> <div class="info">
					<div class="title">
						<span class="material-icons">
							campaign
						</span>${item.title}
					</div>
					<div class="price"><span class="material-icons">
						local_atm
					</span><span>${item.price}</span></div>
					<div class="address">
						<span class="material-icons">place
						</span> ${item.address}
					 </div>
					<div class="district">
						<span class="material-icons">
							my_location
						</span> ${item.district}
					</div>
				</div></div>`;
					} else {
						contentString = ` <div class="post" (click)="navigateToPost(item.id)">
						<div class="avatar">
							<img src="${item.images[0] || 'https://timviec365.vn/pictures/images/b%C4%91s-la-gi-1.jpg'}">
						</div><div class="info">
					<div class="title">
						<span class="material-icons">
							campaign
						</span>${item.title}
					</div>
					<div class="price"><span class="material-icons">
						local_atm
					</span><span>${item.priceFrom} - ${item.priceTo}</span></div>
					<div class="address">
						<span class="material-icons">place
						</span> ${item.address}
					 </div>
					<div class="district">
						<span class="material-icons">
							my_location
						</span> ${item.district}
					</div>
					</div></div>`;
					}
				if (resultPath) {
					const infowindow = new google.maps.InfoWindow({
						content: contentString,
					  });
					let marker = new google.maps.Marker({
						position: new google.maps.LatLng({lat: item.geocode.lat(), lng: item.geocode.lng()}),
						map: this.map,
						animation: google.maps.Animation.DROP
					});
					marker.addListener("click", () => {
						infowindow.open(this.map, marker);
					});
					this.markerList.push(marker);
					this.result.push(item);
				}				
			})
			console.log(this.markerList);
			if (this.result.length === 0) {
				alert('Không tìm thấy bất động sản trong khu vực chỉ định.');
			}
		});
	}

	initPostList(): void {
		let params = new HttpParams().set('limit', '1000');
		this.postService.list(null, params).subscribe({
			next: (res) => {
				this.postList = res.items;
			},
			error: (err) => { },
			complete: () => {
				this.drawingManager['postList'] = this.postList;
				this.drawingManager['markerList'] = [];
				this.drawingManager['drawingAreas'] = [];
				this.drawingManager['result'] = [];
				this.geocodePostList(this.postList);
			}
		})
	}

	mapInitializer(): void {
		this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);
	}

	geocodePostList(postList: any[]): void {
		const geocoder = new google.maps.Geocoder();
		postList.forEach(item => {
			let address: string = `${item.address}, ${item.district}`;
			// item['geocode'] = this.geocodeAddress(geocoder, this.map, address);
			// console.log(item);
			this.timeout += 1000;
			setTimeout(() => {
				geocoder.geocode({ address: address }, (results, status) => {
					if (status === "OK") {
						item['geocode'] = results[0].geometry.location;
					}
					else {
						alert("Geocode was not successful for the following reason: " + status);
					}
				});
			}, this.timeout);
		});
	}

	getPostList(): any[] {
		return this.postList;
	}

	clearDrawing(): void {
		for (let i=0; i< this.drawingManager.markerList.length; i++) {
			this.drawingManager.markerList[i].setMap(null);
		}
		for (let i = 0; i < this.drawingManager.drawingAreas.length; i++) {
			this.drawingManager.drawingAreas[i].setMap(null);
		}
		this.drawingManager.markerList = [];
		this.drawingManager.drawingAreas = [];
		this.drawingManager.result = [];
	}

	isTypeBS13(post: any) {
		if (!post) return;
		if (post.typeBusiness === 1 || post.typeBusiness === 3) {
			return true;
		}
		return false;
	}

	navigateToPost(id: any) {
		this.router.navigateByUrl(`/post/${id}`);
	}

	onChangeTypeBusiness(event: any): void {
		this.drawingManager['typeBusiness'] = event.value;
	}

	onChangeTypeProperty(event: any): void {
		this.drawingManager['typeProperty'] = event.value;
	}
}
