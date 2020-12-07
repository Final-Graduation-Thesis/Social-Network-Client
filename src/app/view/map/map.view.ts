import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';


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
    map: google.maps.Map;
    lat = 10.8016345;
    lng = 106.6742159;
    geoList: any[] = [];
	coordinates = new google.maps.LatLng(this.lat, this.lng);
	mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 12,
  };
    ngOnInit(): void {
        this.mapInitializer();
        const drawingManager = new google.maps.drawing.DrawingManager({
          drawingMode: google.maps.drawing.OverlayType.MARKER,
          drawingControl: true,
          drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: [
              google.maps.drawing.OverlayType.MARKER,
              google.maps.drawing.OverlayType.CIRCLE,
              google.maps.drawing.OverlayType.POLYGON,
              google.maps.drawing.OverlayType.POLYLINE,
              google.maps.drawing.OverlayType.RECTANGLE,
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
        drawingManager.setMap(this.map);
        google.maps.event.addListener(drawingManager, 'overlaycomplete', function(event) {
		  const pointLength: number = event.overlay.getPath().getArray().length;
		  let g: any[]=[];
          for (let i=0;i<pointLength; i++) {
			  	console.log(event.overlay.getPath().getArray()[i].lat());
				let point: any = {
					lat: event.overlay.getPath().getArray()[i].lat(),
					lng: event.overlay.getPath().getArray()[i].lng()
				}
				console.log(point);
				g.push(point);
		  }
		  console.log(g);
		  this.geoList = g;
		  const bermudaTriangle = new google.maps.Polygon({ paths: g });
		  const resultPath = google.maps.geometry.poly.containsLocation(
			new google.maps.LatLng({lat: 10.845135269892838, lng: 106.65524731784667}),
			bermudaTriangle
		  )
			? // A triangle.
			  true
			: false;
			console.log(resultPath);

		});
	}

    mapInitializer() {
        this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);
       }
}
