import {
    AfterContentInit,
    AfterViewChecked,
    OnDestroy,
	Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation
} from '@angular/core';
import { AppsChatDialogComponent } from './chat-dialog/chat-dialog.component';
import { AppsChatOutletComponent } from 'src/app/component/chat/chat-outlet.component';
import { UserService } from 'src/app/service/user.service';
import { PubNubAngular } from 'pubnub-angular2';

@Component({
	selector: 'apps-chat-panel-component',
	templateUrl: './chat-panel.component.html',
	styleUrls: ['./chat-panel.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class AppsChatPanelComponent implements OnInit, OnDestroy {

    static instance: AppsChatPanelComponent;

    pubnub: PubNubAngular
    userList: any = [];
    from: any[] = [];
    channels: string[] = [];
    chatDialogs: any[] = [];
    constructor(
        private userService: UserService,
        private pubnubAngular: PubNubAngular
    ) {
         
    }
    ngOnInit(): void {

        this.pubnub = this.pubnubAngular;
        this.pubnub.init({
            publishKey: 'sub-c-f8e414e0-27dc-11eb-8221-521a7107d7f7',
            subscribeKey: 'sub-c-5d6453ac-281f-11eb-8c1e-e6d4bf858fd7',
            uuid: localStorage.getItem('user_id')
        });  
        this.pubnub.addListener({
            status: function(st) {
                if (st.category === "PNUnknownCategory") {
                    var newState = {
                        new: 'error'
                    };
                    this.pubnub.setState({
                        state: newState
                    },
                    function (status) {
                        console.log(st.errorData.message);
                    });
                }
            },
            message: function(message) {
                let from = message.message.from;
                console.log(message);
                this.a.userService.get(parseInt(from)).subscribe((res) => {
                    if (parseInt(localStorage.getItem('user_id')) !==  parseInt(from)) {
                        this.a.openChatDialog(res, message.message);
                    }
                })
            },
            a: this
        });
        this.userService.list().subscribe({
            next: (res) => {
                this.userList = res;
                this.channels = [];
                res.forEach(user => {
                    let channel: string;
                    if (parseInt(localStorage.getItem('user_id')) > user.id) {
                        channel = `${localStorage.getItem('user_id')}-${user.id}`;
                    } else {
                        channel = `${user.id}-${localStorage.getItem('user_id')}`;
                    }
                    this.channels.push(channel);
                })
            },
            error: (error) => {
                console.log(error);
            },
            complete: () => {

                setTimeout(() => {
                    console.log(this.channels);
                    this.pubnub.subscribe({
                    channels: this.channels,
                    withPresence: true
                });})
            }
        }
        )  
        AppsChatPanelComponent.instance = this;
    }

    ngOnDestroy(): void {
        this.pubnub.unsubscribeAll();
    }

    openChatDialog(user: any, message?: any): void {
        let outlet = AppsChatOutletComponent.instance;
        let isCreateDialog: boolean = true;
        let elementId: number;
        outlet.components.some((component, index) => {
            if (parseInt(component.instance.data.id) === parseInt(user.id)) {
                elementId = index;
                isCreateDialog = false
                return true;
            }
        });
        if (isCreateDialog) {
            let chatDialog = outlet.createChatDialog(AppsChatDialogComponent);
            chatDialog.instance.data = user;
            chatDialog.instance.pubnub = this.pubnub;
        } else {
            if (typeof (elementId) != undefined) {
                let entry: any = {
                    "entry": {
                        'from': user.id.toString(),
                        'message': message.message,
                        'time': Date.now()
                    }
                }
                outlet.components[elementId].instance.messageData.push(entry);
                setTimeout(() => {
                    outlet.components[elementId].instance.chatContent.nativeElement.scrollTop =
                     outlet.components[elementId].instance.chatContent.nativeElement.scrollHeight;
                }, 100);
            }
        }
    }
}
