import {
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
export class AppsChatPanelComponent implements OnInit {

    pubnub: PubNubAngular
    userList: any = [];
    constructor(
        private userService: UserService,
        private pubnubAngular: PubNubAngular
    ) {
    }
    ngOnInit(): void {
        this.userService.list().subscribe((res) => {
            this.userList = res;
        })
        this.pubnub = this.pubnubAngular;
        this.pubnub.init({
            publishKey: 'sub-c-f8e414e0-27dc-11eb-8221-521a7107d7f7',
            subscribeKey: 'sub-c-5d6453ac-281f-11eb-8c1e-e6d4bf858fd7',
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
                // console.log(channel);
                setTimeout(() => {
                    let from = message.message.from;
                    console.log(message);
                    console.log(from);
                    // this.userService.get(parseInt(from)).subscribe((res) => {
                    //     this.openChatDialog(res)
                    // })
                    let user: any = {
                        id: parseInt(from),
                        username: 'Huynh Duy'
                    }
                    this.openChatDialog(user);
            }, 100)
            }
        });
        setTimeout(() => {
            this.pubnub.subscribe({
            channels: ['2-1'],
            withPresence: true
        });})
       
    }

    public openChatDialog(user: any): void {
        let outlet = AppsChatOutletComponent.instance;
        let chatDialog = outlet.createChatDialog(AppsChatDialogComponent);
        chatDialog.data = user;
        chatDialog.pubnub = this.pubnub;
    }
}
