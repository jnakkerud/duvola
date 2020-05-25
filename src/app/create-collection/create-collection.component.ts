import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

import { CollectionItem } from '../core/collection-service/collection.service';
import { CollectionsModule } from '../collections/collections.module';

@Component({
    selector: 'app-create-collection',
    templateUrl: 'create-collection.component.html'
})
export class CreateCollectionComponent {

    private returnUrl: string;

    constructor(private router: Router) { }

    onCancel() {
        // TODO back to originating view
        // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.router.navigate(['/']);
    }

    onNext(newItem: CollectionItem) {
        // move to edit collection
        this.router.navigate(['/collections', newItem.id]);
    }
}

@NgModule({
    imports: [
        RouterModule,
        CollectionsModule,
        CommonModule],
    exports: [CreateCollectionComponent],
    declarations: [CreateCollectionComponent],
  })
  export class CreateCollectionModule {}
