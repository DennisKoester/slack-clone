import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalFunctionsService {
  constructor() {}

  menuCollapsed = false;
  threadIsOpen: boolean = false;

  closeMenu() {
    if (innerWidth < 620) {
      this.toggleMenu();
    }
  }

  toggleMenu() {
    this.menuCollapsed = !this.menuCollapsed;
    if (innerWidth > 620 && this.threadIsOpen === true) {
      this.threadIsOpen = false;
    }
  }
}
