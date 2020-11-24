import {
	Component, ComponentRef, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation
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
    channels: any[] = [];
    components: any[] = [];
    constructor(
        private componentFactoryResolver: ComponentFactoryResolver
    ) {
    }
    ngOnInit(): void {
        AppsChatOutletComponent.instance = this;
    }

    createChatDialog<T extends ChatDialog>(componentType: any): ComponentRef<T> {
        let componentRef: ComponentRef<T> = this.outlet.createComponent(
            this.componentFactoryResolver.resolveComponentFactory(componentType), 0);
        this.components.push(componentRef);
        this.channels.push(componentRef.instance.channel);
        console.log(this.channels);
        if (componentRef.instance.channel in this.channels) {
            this.removeChatDialog(this.components[this.components.length - 1]);
        }

        componentRef.instance.componentRef = componentRef;
        
        componentRef.instance.hideChatEmitter.subscribe((component: any) => {
            this.removeChatDialog(component.componentRef);
        });
        
        if (this.components.length > 3) {
            this.removeChatDialog(this.components[0]);
        }
        return componentRef;
    }

    removeChatDialog(dialog: ComponentRef<any>): void {
        let index: number = this.components.indexOf(dialog);
        if (index < 0) return;
        dialog.destroy();
        this.components.splice(index, 1);
        this.channels.splice(index, 1);
    }
}
