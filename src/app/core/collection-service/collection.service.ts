import { Injectable } from '@angular/core';

export interface CollectionItem {
    id: string;
    name: string;
    description?: string;
    form?: string;
}

const PROJECTS: CollectionItem[] = [
    {
        id: '1',
        name: 'First Project'
    },
    {
        id: '2',
        name: 'Second Project'

    },
    {
        id: '3',
        name: 'Thrid Project',
        description: 'The Third Description'

    },
    {
        id: '4',
        name: 'Fourth Project'

    },
    {
        id: '5',
        name: '5 Project',
        description: 'The Fifth Description'

    },
    {
        id: '6',
        name: '6 Project'

    }
];

@Injectable({
    providedIn: 'root',
})
export class CollectionService {

    private items: CollectionItem[] = [];

    constructor() {
        // seed the collection
        this.items.push.apply(this.items, PROJECTS);
    }

    getCollectionItems(): CollectionItem[] {
        return this.items;
    }

    // TODO better name
    addItem(item: CollectionItem): CollectionItem {
        let editResult: CollectionItem;
        if (item.id === '-1') {
            // create a new ID
            item.id = this.generateId();
            this.items.push(item);
            editResult = item;
        } else {
            editResult = this.getItem(item.id);
            if (editResult) {
                editResult.name = item.name;
                editResult.description = item.description;
                editResult.form = item.form;
            }
        }
        return editResult;
    }

    getItem(itemId: string): CollectionItem {
        return this.items.find(x => x.id === itemId);
    }

    removeItem(item: CollectionItem) {
        for (let i = 0; i < this.items.length; i++) {
            if ( this.items[i].id === item.id) {
                this.items.splice(i, 1);
            }
         }
    }

    private generateId(): string {
        return Math.random().toString(36).substr(2, 9);
    }
}
