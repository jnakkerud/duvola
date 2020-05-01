import { Injectable } from '@angular/core';

import { FirestoreService } from '../firestore-service/firestore.service';
import { CollectionItem } from '../collection-service/collection.service';


export interface TrackingUser {
    collectionId: string;
    email?: string;
    isRegistered?: boolean;
}

export interface Token {
    collectionId: string;
    email?: string;
    // for anonymous users:
    userAgent?: string;
    // TODO more values as fingerprinting
}

@Injectable({providedIn: 'root'})
export class TrackingUserService {

    constructor(private fireStoreService: FirestoreService) { }

    public async lookupTrackingUserByToken(collectionItem: CollectionItem, token?: string): Promise<TrackingUser> {
        let lookupToken = token;
        if (!lookupToken) {
            lookupToken = this.generateTrackingToken({collectionId: collectionItem.id, isRegistered: false});
        }
        let trackingUser = await this.fireStoreService.get<TrackingUser>(`tracking-users/${lookupToken}`);
        if (!trackingUser) {
            // create an anonymous tracking user
            trackingUser = {collectionId: collectionItem.id, isRegistered: false};
        }

        return new Promise<TrackingUser>((resolve) => {
            resolve(trackingUser);
        });
    }

    public generateTrackingToken(user: TrackingUser): string {

        const tokenObj: Token = {
            collectionId: user.collectionId
        };

        if (user.isRegistered) {
            // Base64:  collectionId + email
            tokenObj.email = user.email;
        } else {
            tokenObj.userAgent = navigator.userAgent;
        }

        const encoded = btoa(JSON.stringify(tokenObj));
        console.log('token', encoded);
        return encoded;
    }

    public upsert(user: TrackingUser, token?: string): Promise<string> {
        let trackingToken = token;
        if (!trackingToken) {
            trackingToken = this.generateTrackingToken(user);
        }

        // TODO revisit using tracking token for document ID.  Could be a prob for anonymous users ?
        // Doc ID is limited to 1500 bytes. https://firebase.google.com/docs/firestore/quotas
        return new Promise<string>(resolve => {
            this.fireStoreService.upsert(`tracking-users/${trackingToken}`, user).then(_ => resolve(trackingToken));
        });
    }

}
