import {
	Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation
} from '@angular/core';
import { AppsChatDialogComponent } from './chat-dialog/chat-dialog.component';
import { AppsChatOutletComponent } from 'src/app/component/chat/chat-outlet.component';

@Component({
	selector: 'apps-chat-panel-component',
	templateUrl: './chat-panel.component.html',
	styleUrls: ['./chat-panel.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class AppsChatPanelComponent implements OnInit {

    constructor(
    ) {
    }
    ngOnInit(): void {

    }

    openChatDialog(): void {
        let outlet = AppsChatOutletComponent.instance;
        let chatDialog = outlet.createChatDialog(AppsChatDialogComponent);
        chatDialog.data = 'abcd';
    }
}
