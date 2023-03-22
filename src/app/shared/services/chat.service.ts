import { Injectable } from '@angular/core';
import {
  collectionData,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from '@angular/fire/firestore';
import { collection, DocumentData, Firestore } from '@angular/fire/firestore';
import { Unsubscribe } from 'firebase/app-check';
import { Observable, Subscription } from 'rxjs';
import * as GLOBAL_VAR from './globals';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})

export class ChatService {
  chatId: string;
  chatMessages: Array<any> = [];

  constructor() { }

  async openChat(chatId: string) {

  }
}
