import {
	Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation
} from '@angular/core';
import { AppsChatDialogComponent as ChatDialog} from './chat-dialog/chat-dialog.component';

@Component({
	selector: 'chat-outlet',
    templateUrl: './chat-outlet.component.html',
	styleUrls: ['./chat-outlet.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppsChatOutletComponent implements OnInit {

    static instance: AppsChatOutletComponent;

    @ViewChild("outlet", { read: ViewContainerRef}) outlet: ViewContainerRef;

    components: any[] = [];
    constructor(
        private componentFactory: ComponentFactoryResolver
    ) {
    }
    ngOnInit(): void {
        AppsChatOutletComponent.instance = this;
    }

    createChatDialog(componentType: any): any {
        let componentFactory =
         this.componentFactory.resolveComponentFactory(componentType);
        let componentRef = this.outlet.createComponent(componentFactory);
        this.components.push(componentRef);
        if (this.components.length > 2) {
            this.components.pop();
            componentRef.destroy();
        }
        console.log(this.components);
        return componentRef.instance;
    }
}
