import { Component } from '@angular/core';
import { PubNubAngular } from 'pubnub-angular2';

@Component({
    selector: "apps-chat-view",
    template: "<ul><li *ngFor='let item of pubnub.getMessage(channel)'>{{item.message.message}}</li></ul>"
})
export class AppsChatView {
    pubnub: PubNubAngular;
    channel: string;
    constructor(pubnub: PubNubAngular) {
        this.channel = 'my_channel';
        this.pubnub = pubnub;
        this.pubnub.init({
            publishKey: 'pub-c-4c9e5d81-e20a-471b-81fa-c584d1495f4e',
            subscribeKey: 'sub-c-5d6453ac-281f-11eb-8c1e-e6d4bf858fd7',
            uuid: "user-1",
            autoNetworkDetection: true, // enable for non-browser environment automatic reconnection
            restore: true, // enable catchup on missed messages
        });
        this.pubnub.subscribe({
            channels: [this.channel],
            triggerEvents: ['message']
        });
    }
    ngOnInit() {
        setInterval(() => {
            let hw = {
                "from": "user-1",
                "message": "abcdeg"
            }
            this.pubnub.publish({
                channel: this.channel, message: hw
            });
        }, 3000);
        console.log(this.pubnub.getMessage(this.channel));
        this.pubnub.history(
            {
                channel: 'my_channel',
                count: 100, // 100 is the default
                stringifiedTimeToken: true // false is the default
            },
            function (status, response) 
            {
                console.log(response);
            }
        );
    }
    
}