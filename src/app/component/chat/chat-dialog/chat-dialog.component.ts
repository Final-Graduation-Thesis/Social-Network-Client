import {
	Component, EventEmitter, OnInit, Output, ViewEncapsulation
} from '@angular/core';

@Component({
	selector: 'apps-chat-dialog-component',
	templateUrl: './chat-dialog.component.html',
	styleUrls: ['./chat-dialog.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class AppsChatDialogComponent implements OnInit {
    ngOnInit(): void {
        
    }
}
