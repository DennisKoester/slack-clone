import { Component, Input, OnInit } from '@angular/core';
import { ChannelService } from 'src/app/shared/services/channel.service';
import { ThreadService } from 'src/app/shared/services/thread.service';

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

  constructor(public channelService: ChannelService, public threadService: ThreadService) {}

  async ngOnInit()  {
    await this.sendIndex();
    await this.convert();
    this.resizeImg();
  }

  sendIndex() {
    this.channelService.setValue(this.index);
  }

  convert() {
      const parser = new DOMParser();
      const document = parser.parseFromString(this.message, "text/html");
    }


  resizeImg() {
    this.test = document.querySelectorAll('.card-header p img');
    for (let i = 0; i <  this.test.length; i++) {
      this.test[i].classList.add('resizeImg');   
    }
    console.log(this.test); 
  }

}