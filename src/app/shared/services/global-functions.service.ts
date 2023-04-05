import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalFunctionsService {
  constructor() {}

  menuCollapsed: boolean = false;
  threadIsOpen: boolean = false;
  scrollCounter: number = 0;
  legals: boolean = false;

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

  scrollToBottom(ref): void {
    let container = '';
    if (ref == 'chat' || ref == 'channel') {
      container = 'scrollContainer';
    }
    const scrollContainer = document.getElementById(container);
    try {
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    } catch (err) {}
  }
}
