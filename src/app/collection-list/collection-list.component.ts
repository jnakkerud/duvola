import { Component, NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Observable } from 'rxjs';

import { CollectionService, CollectionItem } from '../core/collection-service/collection.service';
import { AngularMaterialModule } from '../angular-material.module';

@Component({
    selector: 'app-project-list',
    templateUrl: 'collection-list.component.html',
    styleUrls: ['./collection-list.component.scss']
})

export class CollectionListComponent {

    collectionItems: Observable<CollectionItem[]>;

    constructor(collectionService: CollectionService) {
        this.collectionItems = collectionService.getItems();
    }
}

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        BrowserAnimationsModule,
        AngularMaterialModule],
    exports: [CollectionListComponent],
    declarations: [CollectionListComponent],
  })
  export class CollectionListModule {}
