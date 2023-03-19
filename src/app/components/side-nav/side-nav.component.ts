import { Component, Input, OnInit } from '@angular/core';
import { ChannelService } from 'src/app/shared/services/channel.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  @Input() isPrivate: boolean;
  @Input() menuCollapsed: boolean;

ngOnInit(){
  
}

  constructor(public channelService: ChannelService) {}
}
