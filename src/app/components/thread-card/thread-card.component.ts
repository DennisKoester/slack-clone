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
  test: any = [];

  constructor(
    public channelService: ChannelService,
    public threadService: ThreadService,
    public usersService: UsersService
  ) {}

  async ngOnInit() {
    await this.sendIndex();
    await this.convert();
    this.resizeImg();
  }

  sendIndex() {
    this.channelService.setValue(this.index);
  }

  convert() {
    const parser = new DOMParser();
    const document = parser.parseFromString(this.message, 'text/html');
  }

  resizeImg() {
    // this.test = document.querySelectorAll('.card-header p img');
    // for (let i = 0; i <  this.test.length; i++) {
    //   this.test[i].classList.add('resizeImg');
    //       // create an off-screen canvas
    //     var canvas = document.createElement('canvas'),
    //     ctx = canvas.getContext('2d');
    // // set its dimension to target size
    // canvas.width = 100;
    // canvas.height = 100;
    // console.log('richtiges image',this.test[i])
    // // draw source image into the off-screen canvas:
    // ctx.drawImage(this.test[i], 0, 0, 100, 100);
    // // encode image to data-uri with base64 version of compressed image
    // console.log('richtig',canvas.toDataURL()) ;
    // }
  }
}
