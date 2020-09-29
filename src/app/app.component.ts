import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Social-Network-Client';
  navLinks: any = [
    {
      path: '',
      label: 'home'
    },
    {
      path: '/asd',
      label: 'explore'

    },
    {
      path: '/sd',
      label: 'textsms'
    }
  ]
}
