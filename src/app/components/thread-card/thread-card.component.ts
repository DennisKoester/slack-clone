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
  @Input() image: string;
  @Input() timestamp: any;

  // @Input() index: number; // ******** Deprecated, kept just while testing
  @Input() channelId: string;
  @Input() threadId: string;

  @Input() thread: boolean = false;
  @Input() amountAnswers: number;
  @Input() lastAnswer;
  @Input() userImage;
  test: any = [];
  status: boolean = false;


  constructor(
    public channelService: ChannelService,
    public threadService: ThreadService,
    public usersService: UsersService
  ) {}


  async ngOnInit() {
    // await this.sendIndex();
    await this.convert();

  }
   

  // sendIndex() {
  //   this.channelService.setValue(this.index);
  // }

  convert() {
    const parser = new DOMParser();
    const document = parser.parseFromString(this.message, 'text/html');
  }

}
