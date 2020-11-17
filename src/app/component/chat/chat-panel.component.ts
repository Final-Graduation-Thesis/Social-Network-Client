import {
	Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation
} from '@angular/core';
import { AppsChatDialogComponent } from './chat-dialog/chat-dialog.component';

@Component({
	selector: 'apps-chat-panel-component',
	templateUrl: './chat-panel.component.html',
	styleUrls: ['./chat-panel.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class AppsChatPanelComponent implements OnInit {

    @ViewChild("chatDialog", { read: ViewContainerRef}) viewContainerRef: ViewContainerRef;
    constructor(
        private componentFactory: ComponentFactoryResolver
    ) {
    }
    ngOnInit(): void {

    }

    openChatDialog(): void {
        const componentFactory = this.componentFactory.resolveComponentFactory(AppsChatDialogComponent)
        const componentRef = this.viewContainerRef.createComponent(componentFactory);
    }
}
