import { Component } from '@angular/core';
import { GlobalFunctionsService } from 'src/app/shared/services/global-functions.service';

@Component({
  selector: 'app-legals',
  templateUrl: './legals.component.html',
  styleUrls: ['./legals.component.scss']
})
export class LegalsComponent {

  constructor(public globalFunctions: GlobalFunctionsService) {
  }
}
