import {
	Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation
} from '@angular/core';

@Component({
	selector: 'apps-chat-dialog-component',
	templateUrl: './chat-dialog.component.html',
	styleUrls: ['./chat-dialog.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class AppsChatDialogComponent implements OnInit {
	@Input('data') data: any;

	data1 = [
		{
			message: 'Xin chào các bạn',
			owner: false
		},
		{
			message: 'Chào mn',
			owner: true
		},
		{
			message: 'Xin chào các bạn2',
			owner: false
		},
	]
    ngOnInit(): void {
        console.log(this.data);
	}

	close(): void {
		
	}

	onEnterMessage(evt: KeyboardEvent): void {
		console.log('ád');
	}
}
