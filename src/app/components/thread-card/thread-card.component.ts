import { Component, Input, OnInit } from '@angular/core';
import { FunctionsService } from 'src/app/shared/services/functions.service';

@Component({
  selector: 'app-thread-card',
  templateUrl: './thread-card.component.html',
  styleUrls: ['./thread-card.component.scss'],
})
export class ThreadCardComponent implements OnInit {
  @Input() author: string;
  @Input() message: string;
  @Input() index: number;

  constructor(private functions: FunctionsService) {}

ngOnInit(): void {
  this.sendIndex();
}

sendIndex() {
  this.functions.setValue(this.index);
}

}
