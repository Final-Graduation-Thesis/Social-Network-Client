import {
	Component, OnInit, ViewEncapsulation
} from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ActionService } from 'src/app/service/action.service';
import { RecommendService } from 'src/app/service/recommend.service';
import { TypeReportService } from 'src/app/service/type-report.service';
import { AppsAdminModalComponent } from '../../modal/modal.component';
import { AppsAdminRecommendActionDialogComponent } from '../action-dialog/action-dialog.component';
import { AppsAdminRecommendDialogComponent } from '../dialog/dialog.component';

@Component({
	selector: 'apps-admin-recommend-table',
    templateUrl: './table.component.html',
	styleUrls: ['./table.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppsAdminRecommendTableComponent implements OnInit {

    recommendList: any[] = [];
    actionList: any[] = [];
	id: number;
	constructor(
		private router: Router,
        private recommendService: RecommendService,
        private actionService: ActionService,
		private dialog: MatDialog,
	) {}
	
	ngOnInit(): void{
		this.recommendService.onReload().subscribe(res => {
			console.log(res);
			if (res.isReload && !res.isEdited) {
				this.recommendList = this.recommendList.filter(res => res.id != this.id);
				if (res.name) {
					this.recommendList.push({name: res.actionName, id: res.id, activePoint: res.activePoint});
				}
			}
			if (res.isEdited) {
				this.recommendList.some(item => {
					if (item.id == res.id ) {
                        item.name = res.name;
                        item.activePoint = res.activePoint;
						return true;
					}
				})
			}
		})
		this.actionService.onReload().subscribe(res => {
			console.log(res);
			if (res.isReload && !res.isEdited) {
				this.actionList = this.actionList.filter(res => res.id != this.id);
				if (res.name) {
					this.actionList.push({actionName: res.actionName, id: res.id, point: res.point});
				}
			}
			if (res.isEdited) {
				this.actionList.some(item => {
					if (item.id == res.id ) {
                        item.actionName = res.actionName;
                        item.point = res.point;
						return true;
					}
				})
			}
		})
	}
	ngAfterViewInit(): void {
        this.load();
        this.loadAction();
	}

	load(pageNumber: number = 0): void {
			this.recommendService.list().subscribe({
				next: (res) => {
				this.recommendList = res;
			},
			error: (err)=> {},
			complete: () => {}
		});
	}

    loadAction(): void {
        this.actionService.list().subscribe({
            next: (res) => {
            this.actionList = res;
        },
        error: (err)=> {},
        complete: () => {}
    });
    }

	onDelete(id: number): void {
		this.id = id;
		const dialogRef = this.dialog.open(AppsAdminModalComponent, {
			width: '350px',
			data: {
				id: id,
				type: 'delete-recommend-level'
			}
		  });
		
	}

	newType(): void {
		const dialogRef = this.dialog.open(AppsAdminRecommendDialogComponent, {
			width: '450px',
			data: {
			}
		  });
	}

	onEdit(item: any) {
		const dialogRef = this.dialog.open(AppsAdminRecommendDialogComponent, {
			width: '450px',
			data: {
                isEdited: true,
                id: item.id,
				name: item.name,
				activePoint: item.activePoint
			}
		  });
    }

    onDeleteAction(id: number): void {
		this.id = id;
		const dialogRef = this.dialog.open(AppsAdminModalComponent, {
			width: '350px',
			data: {
				id: id,
				type: 'delete-recommend-action'
			}
		  });
		
	}

	newTypeAction(): void {
		const dialogRef = this.dialog.open(AppsAdminRecommendActionDialogComponent, {
			width: '450px',
			data: {
			}
		  });
	}

	onEditAction(item: any) {
		const dialogRef = this.dialog.open(AppsAdminRecommendActionDialogComponent, {
			width: '450px',
			data: {
                isEdited: true,
                id: item.id,
				actionName: item.actionName,
				point: item.point
			}
		  });
	}
}
