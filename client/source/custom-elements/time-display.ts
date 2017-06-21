import {EventAggregator} from 'aurelia-event-aggregator';
import {bindable, inject} from 'aurelia-framework';
import * as moment from 'moment';

import './time-display.less'; 

export class TimeDisplay {
    timeString : string;
    momentString : string;
    private handle;
    private moment;

    private killTimer(){
        if (this.handle){
            clearTimeout(this.handle)
        }
    }

    private updateTime = ()=>{
        this.timeString = this.moment.fromNow();
        this.momentString = this.moment.format('HH:mm:ss');
        this.handle = setTimeout(this.updateTime,500)
    }

    attached(){
        this.moment = moment();
        this.updateTime();
    }

    detached(){
        this.killTimer();
    }
}