import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Observable } from 'rxjs';

import { DynamicFormControlModel } from '../../models/dynamic-form-control.model';
import { StorageService } from '../../../core/storage-service/storage.service';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'dynamic-image',
    templateUrl: 'dynamic-image.component.html'
})
export class DynamicImageComponent implements OnInit {

    @Input() formGroup: FormGroup;
    @Input() model: DynamicFormControlModel;

    @HostBinding('class') elementClass;

    imageUrl: Observable<string | null>;

    constructor(private storage: StorageService) { }

    public ngOnInit() {
        this.elementClass = this.model.gridItemClass;

        // async call
        if (this.model.fileName) {
            this.imageUrl = this.storage.getDownloadURL(this.model.fileName);
        }
    }

}
