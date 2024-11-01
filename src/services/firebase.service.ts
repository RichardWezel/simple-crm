// services/firebase.service.ts

import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../models/user.class';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
    private usersCollection = collection(this.firestore, 'users');

    constructor(private firestore: Firestore) {}

    addUser(user: User) {
        return addDoc(this.usersCollection, user.toJSON());
    }

    getUsers(): Observable<User[]> {
        return collectionData(this.usersCollection, { idField: 'id' }).pipe(
            map(users => users.map(userData => new User(userData)))
        );
    }
}
