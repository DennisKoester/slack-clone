import { Component, Input, OnInit } from '@angular/core';
import { ChannelService } from 'src/app/shared/services/channel.service';
import { ThreadService } from 'src/app/shared/services/thread.service';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-thread-card',
  templateUrl: './thread-card.component.html',
  styleUrls: ['./thread-card.component.scss'],
})
export class ThreadCardComponent implements OnInit {
  @Input() author: string;
  @Input() message: string;
  @Input() timestamp: any;
  @Input() index: number;
  @Input() thread: boolean = false;
  @Input() amountAnswers: number;
  @Input() lastAnswer;
  @Input() userImage;
  test: any = [];



  constructor(
    public channelService: ChannelService,
    public threadService: ThreadService,
    public usersService: UsersService
  ) {}


  async ngOnInit() {
    await this.sendIndex();
    await this.convert();
    // let images = document.querySelectorAll('.imageInMessage');
    // debugger;

    // for (let i = 0; i < images.length; i++) {

    //   const element = images[i];
    //   if (!element.getAttribute('listener')) {
    //       element.addEventListener('click', function () {
    //       element.setAttribute('listener', 'true');
    //       console.log('elemeenet', element.getAttribute('listener'));
    //     })
    //   }
    // }
  }
   

  sendIndex() {
    this.channelService.setValue(this.index);
  }

  convert() {
    const parser = new DOMParser();
    const document = parser.parseFromString(this.message, 'text/html');
  }

  

}
