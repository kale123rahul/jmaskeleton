import * as Jma from '../../interfaces/all-interfaces';
import {EventAggregator} from 'aurelia-event-aggregator';
import {UiService} from '../../services/ui-service';
import {bindable, inject, customElement} from 'aurelia-framework';
import * as _ from 'lodash';
import * as moment from 'moment';

@inject('ApiClient','UiService')
export class MainPage{

    containers : Jma.IMediaContainer[];
    providers : Jma.IMediaProvider[];
    currentProvider : Jma.IMediaProvider;

    constructor(private apiClient : Jma.IApiClient, private uiService : Jma.IUiService){
    }

    attached(){
        return this.apiClient.getAllProviders()
        .then(providers => {
            this.providers = providers;
            this.currentProvider = providers[0];
            return this.apiClient.getContainersByProvider(this.currentProvider.id);
        })        
        .then(containers => {
            this.containers = containers;                        
        })
    }

}