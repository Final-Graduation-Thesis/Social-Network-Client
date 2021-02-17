import {
	AfterViewInit,
	Component, ComponentRef, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChange, ViewChild, ViewEncapsulation
} from '@angular/core';
import { PubNubAngular } from 'pubnub-angular2';
import { UserService } from 'src/app/service/user.service';

@Component({
	selector: 'apps-chat-dialog-component',
	templateUrl: './chat-dialog.component.html',
	styleUrls: ['./chat-dialog.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class AppsChatDialogComponent implements OnInit, AfterViewInit {

	componentRef: ComponentRef<AppsChatDialogComponent>;
	@Input('data') data: any;
	@Input('pubnub') pubnub: any;
	channel: string;
	@ViewChild('chatInput') chatInput: ElementRef;
	@ViewChild('chatContent') chatContent: ElementRef;
	messageData: any;
	@Output('emitMessage') emitMessage: EventEmitter<any> =  new EventEmitter();
	@Output('hideChatEmiiter') hideChatEmitter: EventEmitter<any> = new EventEmitter();
	avatar: any;
	constructor(private pubnubAngular: PubNubAngular,
		private userService: UserService) {

	}
	
    ngOnInit(): void {
		this.userService.get(this.data.id).subscribe(res=> {
			this.avatar = res.avatar;
			console.log(this.avatar);
		})
		this.data.id = this.data.id.toString();
		if (parseInt(localStorage.getItem('user_id')) > this.data.id) {
			this.channel = `${localStorage.getItem('user_id')}-${this.data.id}`;
		} else {
			this.channel = `${this.data.id}-${localStorage.getItem('user_id')}`;
		}
		this.pubnub = this.pubnubAngular;
		this.pubnub.init({
            publishKey: 'pub-c-4c9e5d81-e20a-471b-81fa-c584d1495f4e',
			subscribeKey: 'sub-c-5d6453ac-281f-11eb-8c1e-e6d4bf858fd7',
			keepAlive: true
		});   
		this.pubnub.history(
            {
                channel: this.channel,
                count: 30, // 100 is the default
                stringifiedTimeToken: true // false is the default
            },
			(status, response) => {
				setTimeout(() => {
					this.messageData = response.messages;
				}, 100)
            }
		);
		setTimeout(() => {
			this.chatContent.nativeElement.scrollTop = this.chatContent.nativeElement.scrollHeight;
		}, 500);
	
	}
	ngAfterViewInit(): void {
		
	}

	close(): void {
		this.hideChatEmitter.emit(this);
	}

	onEnterMessage(evt: EventTarget): void {
		let hw = {
			"from": localStorage.getItem('user_id'),
			"message": this.chatInput.nativeElement.value,
			"time": Date.now()
		}
		this.pubnub.publish({
			channel: this.channel,
			message: hw
		});
		let entry: any = {
			"entry": {
				'from': localStorage.getItem('user_id'),
				'message': this.chatInput.nativeElement.value,
				'time': Date.now()
			}
		}
		this.messageData.push(entry);
		this.chatInput.nativeElement.value = "";
		this.chatInput.nativeElement.blur();
		setTimeout(() => {
			this.chatContent.nativeElement.scrollTop = this.chatContent.nativeElement.scrollHeight;
		}, 100);
	}
}
