import { Injectable } from '@angular/core';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { user } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private firestore: Firestore) {}

  createUser(uid: string, userData: user) {
    const userDocRef = doc(this.firestore, `users/${uid}`);
    return setDoc(userDocRef, userData);
  }

  async getUser(uid: string): Promise<user | null> {
    const userDocRef = doc(this.firestore, `users/${uid}`);
    const userDoc = await getDoc(userDocRef);
    return userDoc.exists() ? (userDoc.data() as user) : null;
  }
}
